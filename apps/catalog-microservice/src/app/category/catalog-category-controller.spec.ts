import { Generate } from '@jerky/common';
import { ALIAS, DESCRIPTION } from '@jerky/constants';
import {
    InternalCategoryCreateCommandContract,
    InternalCategoryFindManyQueryContract,
    InternalCategoryFindOneQueryContract,
    InternalCategoryRemoveCommandContract,
    InternalCategoryUpdateCommandContract,
} from '@jerky/contracts';
import { TCategoryWithPayload } from '@jerky/interfaces';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto';
import { RMQError, RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';

import { CatalogCategoryController } from './catalog-category-controller';
import { CatalogCategoryModule } from './catalog-category-module';

type TModel = TCategoryWithPayload;
type TModelWithPayload = TCategoryWithPayload;
class CreateRequest extends InternalCategoryCreateCommandContract.Request {}
type CreateResponse = InternalCategoryCreateCommandContract.Response;
const CreateTopic = InternalCategoryCreateCommandContract.topic;

class UpdateRequest extends InternalCategoryUpdateCommandContract.Request {}
type UpdateResponse = InternalCategoryUpdateCommandContract.Response;
const UpdateTopic = InternalCategoryUpdateCommandContract.topic;

class RemoveRequest extends InternalCategoryRemoveCommandContract.Request {}
type RemoveResponse = InternalCategoryRemoveCommandContract.Response;
const RemoveTopic = InternalCategoryRemoveCommandContract.topic;

class FindOneRequest extends InternalCategoryFindOneQueryContract.Request {}
type FindOneResponse = InternalCategoryFindOneQueryContract.Response;
const FindOneTopic = InternalCategoryFindOneQueryContract.topic;

class FindManyRequest extends InternalCategoryFindManyQueryContract.Request {}
type FindManyResponse = InternalCategoryFindManyQueryContract.Response;
const FindManyTopic = InternalCategoryFindManyQueryContract.topic;

describe('[ Category Controller ]', () => {
    let app: NestApplication;
    let controller: CatalogCategoryController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true }),
                RMQModule.forTest({}),
                CatalogCategoryModule,
            ],
        }).compile();

        app = module.createNestApplication();

        controller = app.get<CatalogCategoryController>(
            CatalogCategoryController,
        );
        rmqService = app.get(RMQService);

        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it(`[ app ] toBeDefined`, function () {
        expect(app).toBeDefined();
    });
    it(`[ controller ] toBeDefined - success`, function () {
        expect(controller).toBeDefined();
    });
    it(`[ rmqService ] toBeDefined - success`, function () {
        expect(rmqService).toBeDefined();
    });

    /** ******************************************************************* **/

    const models: TModel[] = [];
    const generateBaseProps = (): CreateRequest => {
        return {
            data: {
                alias: crypto.randomUUID(),
                title: crypto.randomUUID(),
                description: crypto.randomUUID(),
            },
        };
    };
    const createViaController = async (
        props?: CreateRequest,
    ): Promise<TModelWithPayload> => {
        return await controller.create(props ?? generateBaseProps());
    };
    const _createViaRMQ = async (props: CreateRequest): Promise<TModel> => {
        return await rmqService.triggerRoute<CreateRequest, CreateResponse>(
            CreateTopic,
            props,
        );
    };
    const _updateViaRMQ = async (props: UpdateRequest): Promise<TModel> => {
        return await rmqService.triggerRoute<UpdateRequest, UpdateResponse>(
            UpdateTopic,
            props,
        );
    };
    const _removeViaRMQ = async (props: RemoveRequest): Promise<TModel> => {
        return await rmqService.triggerRoute<RemoveRequest, RemoveResponse>(
            RemoveTopic,
            props,
        );
    };
    const _findOneViaRMQ = async (props: FindOneRequest): Promise<TModel> => {
        return await rmqService.triggerRoute<FindOneRequest, FindOneResponse>(
            FindOneTopic,
            props,
        );
    };
    const _findManyViaRMQ = async (
        props: FindManyRequest,
    ): Promise<TModel[]> => {
        return await rmqService.triggerRoute<FindManyRequest, FindManyResponse>(
            FindManyTopic,
            props,
        );
    };

    /** ******************************************************************* **/

    describe(`[ RMQ ] C-R-U-D`, () => {
        describe(`[  C  ]`, () => {
            describe(`create - (${CreateTopic})`, () => {
                describe(`correct props`, () => {
                    it(`expect success`, async () => {
                        const props: CreateRequest = {
                            ...generateBaseProps(),
                            select: {
                                uuid: true,
                                alias: true,
                                title: true,
                                description: true,
                                product: {
                                    take: 10,
                                },
                                recipe: true,
                            },
                        };
                        await _createViaRMQ(props)
                            .then((res) => {
                                models.push(res);

                                expect(res.alias).toEqual(props.data.alias);
                                expect(res.title).toEqual(props.data.title);
                                expect(res.description).toEqual(
                                    props.data.description,
                                );
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                });
                describe(`validation`, () => {
                    describe(`empty props`, () => {
                        it(`expect RMQError`, async () => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const props: CreateRequest = {};
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                    });

                    describe(`alias`, () => {
                        it(`duplicate - expect ConflictException`, async () => {
                            const tmp: TModelWithPayload =
                                await createViaController();
                            models.push(tmp);

                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    alias: <string>tmp.alias,
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof ConflictException);
                                });
                        });
                        it(`not valid - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                ...generateBaseProps(),
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                alias: 42,
                            };

                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                        it(`to short - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    alias: <string>(
                                        Generate.string(
                                            ALIAS.MIN_LENGTH - 1,
                                            'z',
                                        )
                                    ),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                        it(`to long - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    alias: <string>(
                                        Generate.string(
                                            ALIAS.MAX_LENGTH + 1,
                                            'a',
                                        )
                                    ),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`title`, () => {
                        it(`duplicate - expect ConflictException`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    title: <string>tmp.title,
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof ConflictException);
                                });
                        });
                        it(`not valid - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    title: 42,
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`to short - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    title: <string>Generate.string(3, 'a'),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`to long - expect  RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    title: <string>Generate.string(129, 'a'),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`description`, () => {
                        it(`not valid - expect RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    description: 42,
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`to short - expect RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    description: <string>(
                                        Generate.string(
                                            DESCRIPTION.MIN_LENGTH - 1,
                                            'a',
                                        )
                                    ),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`to long - expect RMQError`, async () => {
                            const props: CreateRequest = {
                                data: {
                                    ...generateBaseProps().data,
                                    description: <string>(
                                        Generate.string(
                                            DESCRIPTION.MAX_LENGTH + 1,
                                            'a',
                                        )
                                    ),
                                },
                            };
                            await _createViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                });
            });
        });
        describe(`[  R  ]`, () => {
            describe(`find one`, () => {
                describe(`uuid - (${FindOneTopic})`, () => {
                    describe(`correct props`, () => {
                        it(`correct uuid - expect success`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const props: FindOneRequest = {
                                where: { uuid: tmp.uuid },
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res.uuid).toEqual(tmp.uuid);
                                })
                                .catch((e) => {
                                    expect(e).toBeUndefined();
                                });
                        });
                    });
                    describe(`validation`, () => {
                        describe(`empty props`, () => {
                            it(`expect RMQError`, async () => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                const props: FindOneRequest = {};
                                await _findOneViaRMQ(props)
                                    .then((res) => {
                                        expect(res).toBeUndefined();
                                    })
                                    .catch((e) => {
                                        expect(e instanceof NotFoundException);
                                    });
                            });
                        });
                        it(`wrong uuid - expect NotFoundException`, async () => {
                            const props: FindOneRequest = {
                                where: {
                                    uuid: 'wrongUuid',
                                },
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof NotFoundException);
                                });
                        });
                        it(`not valid uuid - expect RMQError`, async () => {
                            const uuid = 42;
                            const props: FindOneRequest = {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                uuid,
                            };

                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                });
                describe(`title - ${FindOneTopic}`, () => {
                    describe(`correct props`, () => {
                        it(`correct title - expect success`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const props: FindOneRequest = {
                                where: { title: tmp.title },
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res.title).toEqual(tmp.title);
                                })
                                .catch((e) => {
                                    expect(e).toBeUndefined();
                                });
                        });
                    });
                    describe(`validation`, () => {
                        describe(`empty props`, () => {
                            it(`expect RMQError`, async () => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                const props: FindOneTitleRequest = {};
                                await _findOneViaRMQ(props)
                                    .then((res) => {
                                        expect(res).toBeUndefined();
                                    })
                                    .catch((e) => {
                                        expect(e instanceof NotFoundException);
                                    });
                            });
                        });
                        it(`wrong title - expect NotFoundException`, async () => {
                            const title = 'wrongTitle';
                            const props: FindOneRequest = {
                                where: {
                                    title,
                                },
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof NotFoundException);
                                });
                        });
                        it(`not valid title - expect RMQError`, async () => {
                            const title = 42;
                            const props: FindOneRequest = {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                title,
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                });
            });
            describe(`find many - (${FindManyTopic})`, () => {
                describe(`correct props`, () => {
                    it(`select product - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            select: {
                                title: true,
                                alias: true,
                                product: {},
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length > 0).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`uuid - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: {
                                uuid: { equals: tmp.uuid },
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length === 1).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`alias - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: {
                                alias: {
                                    contains: tmp.alias,
                                },
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length === 1).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`title - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: {
                                title: {
                                    contains: tmp.title,
                                },
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length === 1).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`description - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: tmp.description
                                ? {
                                      description: {
                                          contains: tmp.description,
                                      },
                                  }
                                : {},
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length > 0).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`createdAt - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: {
                                createdAt: {
                                    equals: tmp.createdAt,
                                },
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length > 0).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`updatedAt - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: FindManyRequest = {
                            where: {
                                updatedAt: {
                                    equals: tmp.updatedAt,
                                },
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length > 0).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                    it(`(empty) - expect success`, async () => {
                        const props: FindManyRequest = {};
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res.length > 0).toEqual(true);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                });
                describe(`validation`, () => {
                    it(`wrong props combination - expect RMQError`, async () => {
                        const props: FindManyRequest = {
                            select: {
                                title: true,
                                alias: true,
                                product: {},
                            },
                            include: {
                                product: true,
                            },
                        };
                        await _findManyViaRMQ(props)
                            .then((res) => {
                                expect(res).toBeUndefined();
                            })
                            .catch((e) => {
                                expect(e).toBeInstanceOf(RMQError);
                            });
                    });
                    describe(`include`, () => {
                        it(`not valid - expect RMQError`, async () => {
                            const props: FindManyRequest = {
                                include: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    product: 'include',
                                },
                            };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`select`, () => {
                        it(`not valid - expect RMQError`, async () => {
                            const props: FindManyRequest = {
                                select: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    title: 'select',
                                },
                            };

                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`take`, () => {
                        it(`string - expect RMQError`, async () => {
                            const take = 'string';
                            const props: FindManyRequest = {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                take,
                            };

                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`negative number - expect RMQError`, async () => {
                            const take = -42;
                            const props: FindManyRequest = { take };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`infinity - expect - RMQError`, async () => {
                            const take = Infinity;
                            const props: FindManyRequest = { take };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`skip`, () => {
                        it(`string - expect - RMQError`, async () => {
                            const skip = 'string';
                            const props: FindManyRequest = {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                skip,
                            };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`negative number - expect RMQError`, async () => {
                            const skip = -42;
                            const props: FindManyRequest = { skip };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`infinity - expect - RMQError`, async () => {
                            const skip = Infinity;
                            const props: FindManyRequest = { skip };

                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`orderBy`, () => {
                        it(`not valid - expect RMQError`, async () => {
                            const orderBy = { title: 'up' };
                            const props: FindManyRequest = {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                orderBy,
                            };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`where`, () => {
                        describe(`uuid`, () => {
                            it(``, async () => {
                                //
                            });
                        });
                        describe(`alias`, () => {
                            //
                        });
                        describe(`title`, () => {
                            //
                        });
                        describe(`description`, () => {
                            //
                        });
                        describe(`createdAt`, () => {
                            //
                        });
                        describe(`updatedAt`, () => {
                            //
                        });
                        describe(`combination`, () => {
                            //
                        });

                        it(`number - expect RMQError`, async () => {
                            const searchString = 42;
                            const props: FindManyRequest = {
                                where: {
                                    title: {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        contains: searchString,
                                    },
                                },
                            };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`negative number - expect RMQError`, async () => {
                            const searchString = -42;
                            const props: FindManyRequest = {
                                where: {
                                    title: {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        contains: searchString,
                                    },
                                },
                            };
                            await _findManyViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                });
            });
        });
        describe(`[  U  ]`, () => {
            describe(`Update - (${UpdateTopic})`, () => {
                describe(`correct props`, () => {
                    it(`correct props - expect success`, async () => {
                        const tmp = await createViaController();
                        models.push(tmp);

                        const props: UpdateRequest = {
                            where: {
                                uuid: tmp.uuid,
                            },
                            data: { ...generateBaseProps().data },
                        };
                        await _updateViaRMQ(props)
                            .then((res) => {
                                expect(res.uuid).toEqual(props.where.uuid);
                                expect(res.alias).toEqual(props.data.alias);
                                expect(res.title).toEqual(props.data.title);
                                expect(res.description).toEqual(
                                    props.data.description,
                                );
                            })
                            .catch((e) => {
                                console.log(e);
                                expect(e).toBeUndefined();
                            });
                    });
                });
                describe(`validation`, () => {
                    describe(`empty props`, () => {
                        it(`expect RMQError`, async () => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const props: UpdateRequest = {};

                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`uuid`, () => {
                        it(`wrong uuid - expect RMQError`, async () => {
                            const uuid = 'wrongUuid';
                            const props: UpdateRequest = {
                                where: {
                                    uuid,
                                },
                                ...generateBaseProps(),
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                        it(`not valid uuid - expect RMQError`, async () => {
                            const uuid = 42;
                            const props: UpdateRequest = {
                                ...generateBaseProps(),
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                uuid,
                            };

                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(RMQError);
                                });
                        });
                    });
                    describe(`alias`, () => {
                        it(`duplicate alias - expect ConflictException`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const tmp2 = await createViaController();
                            models.push(tmp2);

                            const props: UpdateRequest = {
                                where: {
                                    uuid: tmp2.uuid,
                                },
                                data: {
                                    alias: tmp.alias,
                                },
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(ConflictException);
                                });
                        });
                        it(`not valid alias - expect RMQError`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const alias = 42;
                            const props: UpdateRequest = {
                                where: {
                                    uuid: tmp.uuid,
                                },
                                data: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    alias,
                                },
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                    });
                    describe(`title`, () => {
                        it(`duplicate title - expect ConflictException`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const tmp2 = await createViaController();
                            models.push(tmp2);

                            const props: UpdateRequest = {
                                where: {
                                    uuid: tmp2.uuid,
                                },
                                data: {
                                    title: tmp.title,
                                },
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e).toBeInstanceOf(ConflictException);
                                });
                        });
                        it(`not valid title - expect RMQError`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const title = 42;
                            const props: UpdateRequest = {
                                where: {
                                    uuid: tmp.uuid,
                                },
                                data: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    title,
                                },
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                    });
                    describe(`description`, () => {
                        it(`not valid description - expect RMQError`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);
                            const description = 42;
                            const props: UpdateRequest = {
                                where: {
                                    uuid: tmp.uuid,
                                },
                                data: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    description,
                                },
                            };
                            await _updateViaRMQ(props)
                                .then((res) => {
                                    expect(res).toBeUndefined();
                                })
                                .catch((e) => {
                                    expect(e instanceof RMQError);
                                });
                        });
                    });
                });
            });
        });
        describe(`[  D  ]`, () => {
            describe(`Remove - (${RemoveTopic})`, () => {
                describe(`correct props`, () => {
                    it(`expect success`, async () => {
                        const { uuid } = await createViaController();
                        const props: RemoveRequest = {
                            where: {
                                uuid: uuid,
                            },
                        };
                        await _removeViaRMQ(props)
                            .then((res) => {
                                expect(res.uuid).toEqual(uuid);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                });
                describe(`validation`, () => {
                    it(`wrong uuid - expect NotFoundException`, async () => {
                        const props: RemoveRequest = {
                            where: { uuid: 'wrongUuid' },
                        };
                        await _removeViaRMQ(props)
                            .then((res) => {
                                expect(res).toBeUndefined();
                            })
                            .catch((e) => {
                                expect(e instanceof NotFoundException);
                            });
                    });
                    it(`not valid uuid  - expect RMQError`, async () => {
                        const props: RemoveRequest = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            uuid: 42,
                        };
                        await _removeViaRMQ(props)
                            .then((res) => {
                                expect(res).toBeUndefined();
                            })
                            .catch((e) => {
                                expect(e instanceof RMQError);
                            });
                    });
                });
            });
        });
        describe(`[ CleanUp ]`, () => {
            it(`Remove All created records`, async () => {
                for (const el of models) {
                    await controller.remove({
                        where: {
                            uuid: el.uuid,
                        },
                    });
                }
            });
        });
    });
});

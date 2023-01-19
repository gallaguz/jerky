import { faker } from '@faker-js/faker';
import { ContractsValidationService } from '@jerky/common';
import {
    InternalUserCreateCommandContract,
    InternalUserFindManyQueryContract,
    InternalUserFindOneQueryContract,
    InternalUserHealthCheckQueryContract,
    InternalUserRemoveCommandContract,
    InternalUserUpdateCommandContract,
} from '@jerky/contracts';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client/scripts/user-client';
import * as crypto from 'crypto';
import { RMQError, RMQModule, RMQService } from 'nestjs-rmq';

import { RmqConfig } from '../../configs';
import { DatabaseModule } from '../../database/database-module';
import { UserController } from './user-controller';
import { UserEventService } from './user-event-service';
import { UserRepository } from './user-repository';
import { UserService } from './user-service';

type TModel = User;
class CreateRequest extends InternalUserCreateCommandContract.Request {}
type CreateResponse = InternalUserCreateCommandContract.Response;
const CreateTopic = InternalUserCreateCommandContract.topic;

class UpdateRequest extends InternalUserUpdateCommandContract.Request {}
type UpdateResponse = InternalUserUpdateCommandContract.Response;
const UpdateTopic = InternalUserUpdateCommandContract.topic;

class RemoveRequest extends InternalUserRemoveCommandContract.Request {}
type RemoveResponse = InternalUserRemoveCommandContract.Response;
const RemoveTopic = InternalUserRemoveCommandContract.topic;

class FindOneRequest extends InternalUserFindOneQueryContract.Request {}
type FindOneResponse = InternalUserFindOneQueryContract.Response;
const FindOneTopic = InternalUserFindOneQueryContract.topic;

class FindManyRequest extends InternalUserFindManyQueryContract.Request {}
type FindManyResponse = InternalUserFindManyQueryContract.Response;
const FindManyTopic = InternalUserFindManyQueryContract.topic;

describe('[ User Microservice ]', () => {
    let app: INestApplication;
    let controller: UserController;
    let rmqService: RMQService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true }),
                RMQModule.forRootAsync(RmqConfig()),
                DatabaseModule,
            ],
            providers: [
                ContractsValidationService,
                UserService,
                ConfigService,
                UserRepository,
                UserEventService,
            ],
            controllers: [UserController],
        }).compile();

        app = module.createNestApplication();
        controller = app.get<UserController>(UserController);
        rmqService = app.get(RMQService);
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });

    /** ******************************************************************* **/

    it(`[ app ] toBeDefined`, function () {
        expect(app).toBeDefined();
    });
    it(`[ controller ] toBeDefined - success`, function () {
        expect(controller).toBeDefined();
    });
    it(`[ rmqService ] toBeDefined - success`, function () {
        expect(rmqService).toBeDefined();
    });
    it(`[ heathCheck ] - success`, async () => {
        await rmqService
            .send<
                InternalUserHealthCheckQueryContract.Request,
                InternalUserHealthCheckQueryContract.Response
            >(InternalUserHealthCheckQueryContract.topic, {
                ping: true,
            })
            .then((res) => {
                expect(res.pong).toEqual(true);
            });
    });

    /** ******************************************************************* **/

    const models: TModel[] = [];
    const generateBaseProps = (): CreateRequest => {
        return {
            data: {
                email: faker.internet.email(),
                passwordHash: crypto.randomUUID(),
                salt: crypto.randomUUID(),
                role: 'USER',
            },
        };
    };
    const createViaController = async (
        props?: CreateRequest,
    ): Promise<TModel> => {
        return await controller.create(props ?? generateBaseProps());
    };
    const _createViaRMQ = async (props: CreateRequest): Promise<TModel> => {
        return await rmqService.send<CreateRequest, CreateResponse>(
            CreateTopic,
            props,
        );
    };
    const _updateViaRMQ = async (props: UpdateRequest): Promise<TModel> => {
        return await rmqService.send<UpdateRequest, UpdateResponse>(
            UpdateTopic,
            props,
        );
    };
    const _removeViaRMQ = async (props: RemoveRequest): Promise<TModel> => {
        return await rmqService.send<RemoveRequest, RemoveResponse>(
            RemoveTopic,
            props,
        );
    };
    const _findOneViaRMQ = async (props: FindOneRequest): Promise<TModel> => {
        return await rmqService.send<FindOneRequest, FindOneResponse>(
            FindOneTopic,
            props,
        );
    };
    const _findManyViaRMQ = async (
        props: FindManyRequest,
    ): Promise<TModel[]> => {
        return await rmqService.send<FindManyRequest, FindManyResponse>(
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
                                email: true,
                                role: true,
                            },
                        };

                        await _createViaRMQ(props)
                            .then((res) => {
                                models.push(res);

                                expect(res.email).toEqual(props.data.email);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                });
                // describe(`validation`, () => {
                //     describe(`empty props`, () => {
                //         it(`expect RMQError`, async () => {
                //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //             // @ts-ignore
                //             const props: CreateRequest = {};
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //     });
                //
                //     describe(`alias`, () => {
                //         it(`duplicate - expect ConflictException`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 alias: tmp.alias,
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof ConflictException);
                //                 });
                //         });
                //         it(`not valid - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 alias: 42,
                //             };
                //
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //         it(`to short - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 alias: <string>(
                //                     Generate.string(ALIAS.MIN_LENGTH - 1, 'z')
                //                 ),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //         it(`to long - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 alias: <string>(
                //                     Generate.string(ALIAS.MAX_LENGTH + 1, 'a')
                //                 ),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`title`, () => {
                //         it(`duplicate - expect ConflictException`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 title: tmp.title,
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof ConflictException);
                //                 });
                //         });
                //         it(`not valid - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 title: 42,
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`to short - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 title: <string>Generate.string(3, 'a'),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`to long - expect  RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 title: <string>Generate.string(129, 'a'),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`description`, () => {
                //         it(`not valid - expect RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 description: 42,
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`to short - expect RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 description: <string>(
                //                     Generate.string(
                //                         DESCRIPTION.MIN_LENGTH - 1,
                //                         'a',
                //                     )
                //                 ),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`to long - expect RMQError`, async () => {
                //             const props: CreateRequest = {
                //                 ...generateBaseProps(),
                //                 description: <string>(
                //                     Generate.string(
                //                         DESCRIPTION.MAX_LENGTH + 1,
                //                         'a',
                //                     )
                //                 ),
                //             };
                //             await _createViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                // });
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
                    // describe(`validation`, () => {
                    //     describe(`empty props`, () => {
                    //         it(`expect RMQError`, async () => {
                    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //             // @ts-ignore
                    //             const props: FindOneRequest = {};
                    //             await _findOneViaRMQ(props)
                    //                 .then((res) => {
                    //                     expect(res).toBeUndefined();
                    //                 })
                    //                 .catch((e) => {
                    //                     expect(e instanceof NotFoundException);
                    //                 });
                    //         });
                    //     });
                    //     it(`wrong uuid - expect NotFoundException`, async () => {
                    //         const props: FindOneRequest = {
                    //             where: {
                    //                 uuid: 'wrongUuid',
                    //             },
                    //         };
                    //         await _findOneViaRMQ(props)
                    //             .then((res) => {
                    //                 expect(res).toBeUndefined();
                    //             })
                    //             .catch((e) => {
                    //                 expect(e instanceof NotFoundException);
                    //             });
                    //     });
                    //     it(`not valid uuid - expect RMQError`, async () => {
                    //         const uuid = 42;
                    //         const props: FindOneRequest = {
                    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //             // @ts-ignore
                    //             uuid,
                    //         };
                    //
                    //         await _findOneViaRMQ(props)
                    //             .then((res) => {
                    //                 expect(res).toBeUndefined();
                    //             })
                    //             .catch((e) => {
                    //                 expect(e).toBeInstanceOf(RMQError);
                    //             });
                    //     });
                    // });
                });
                describe(`email - ${FindOneTopic}`, () => {
                    describe(`correct props`, () => {
                        it(`correct email - expect success`, async () => {
                            const tmp = await createViaController();
                            models.push(tmp);

                            const props: FindOneRequest = {
                                where: { email: tmp.email },
                            };
                            await _findOneViaRMQ(props)
                                .then((res) => {
                                    expect(res.email).toEqual(tmp.email);
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
                                        expect(e instanceof RMQError);
                                    });
                            });
                        });
                        it(`wrong email - expect NotFoundException`, async () => {
                            const email = 'wrong@email.com';
                            const props: FindOneRequest = {
                                where: {
                                    email,
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
                        it(`not valid email - expect RMQError`, async () => {
                            const email = 42;
                            const props: FindOneRequest = {
                                where: {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    email: email,
                                },
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
                                uuid: true,
                                email: true,
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
                // describe(`validation`, () => {
                //     it(`wrong props combination - expect RMQError`, async () => {
                //         const props: FindManyRequest = {
                //             select: {
                //                 title: true,
                //                 alias: true,
                //                 product: {},
                //             },
                //             include: {
                //                 product: true,
                //             },
                //         };
                //         await _findManyViaRMQ(props)
                //             .then((res) => {
                //                 expect(res).toBeUndefined();
                //             })
                //             .catch((e) => {
                //                 expect(e).toBeInstanceOf(RMQError);
                //             });
                //     });
                //     describe(`include`, () => {
                //         it(`not valid - expect RMQError`, async () => {
                //             const props: FindManyRequest = {
                //                 include: {
                //                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                     // @ts-ignore
                //                     product: 'include',
                //                 },
                //             };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`select`, () => {
                //         it(`not valid - expect RMQError`, async () => {
                //             const props: FindManyRequest = {
                //                 select: {
                //                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                     // @ts-ignore
                //                     title: 'select',
                //                 },
                //             };
                //
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`take`, () => {
                //         it(`string - expect RMQError`, async () => {
                //             const take = 'string';
                //             const props: FindManyRequest = {
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 take,
                //             };
                //
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`negative number - expect RMQError`, async () => {
                //             const take = -42;
                //             const props: FindManyRequest = { take };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`infinity - expect - RMQError`, async () => {
                //             const take = Infinity;
                //             const props: FindManyRequest = { take };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`skip`, () => {
                //         it(`string - expect - RMQError`, async () => {
                //             const skip = 'string';
                //             const props: FindManyRequest = {
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 skip,
                //             };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`negative number - expect RMQError`, async () => {
                //             const skip = -42;
                //             const props: FindManyRequest = { skip };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`infinity - expect - RMQError`, async () => {
                //             const skip = Infinity;
                //             const props: FindManyRequest = { skip };
                //
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`orderBy`, () => {
                //         it(`not valid - expect RMQError`, async () => {
                //             const orderBy = { title: 'up' };
                //             const props: FindManyRequest = {
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 orderBy,
                //             };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`where`, () => {
                //         describe(`uuid`, () => {
                //             it(``, async () => {
                //                 //
                //             });
                //         });
                //         describe(`alias`, () => {
                //             //
                //         });
                //         describe(`title`, () => {
                //             //
                //         });
                //         describe(`description`, () => {
                //             //
                //         });
                //         describe(`createdAt`, () => {
                //             //
                //         });
                //         describe(`updatedAt`, () => {
                //             //
                //         });
                //         describe(`combination`, () => {
                //             //
                //         });
                //
                //         it(`number - expect RMQError`, async () => {
                //             const searchString = 42;
                //             const props: FindManyRequest = {
                //                 where: {
                //                     title: {
                //                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                         // @ts-ignore
                //                         contains: searchString,
                //                     },
                //                 },
                //             };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`negative number - expect RMQError`, async () => {
                //             const searchString = -42;
                //             const props: FindManyRequest = {
                //                 where: {
                //                     title: {
                //                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                         // @ts-ignore
                //                         contains: searchString,
                //                     },
                //                 },
                //             };
                //             await _findManyViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                // });
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
                                expect(res.email).toEqual(props.data.email);
                                expect(res.role).toEqual(props.data.role);
                            })
                            .catch((e) => {
                                expect(e).toBeUndefined();
                            });
                    });
                });
                // describe(`validation`, () => {
                //     describe(`empty props`, () => {
                //         it(`expect RMQError`, async () => {
                //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //             // @ts-ignore
                //             const props: UpdateRequest = {};
                //
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`uuid`, () => {
                //         it(`wrong uuid - expect RMQError`, async () => {
                //             const uuid = 'wrongUuid';
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid,
                //                 },
                //                 ...generateBaseProps(),
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //         it(`not valid uuid - expect RMQError`, async () => {
                //             const uuid = 42;
                //             const props: UpdateRequest = {
                //                 ...generateBaseProps(),
                //                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                 // @ts-ignore
                //                 uuid,
                //             };
                //
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(RMQError);
                //                 });
                //         });
                //     });
                //     describe(`alias`, () => {
                //         it(`duplicate alias - expect ConflictException`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const tmp2 = await createViaController();
                //             models.push(tmp2);
                //
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid: tmp2.uuid,
                //                 },
                //                 data: {
                //                     alias: tmp.alias,
                //                 },
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(ConflictException);
                //                 });
                //         });
                //         it(`not valid alias - expect RMQError`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const alias = 42;
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid: tmp.uuid,
                //                 },
                //                 data: {
                //                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                     // @ts-ignore
                //                     alias,
                //                 },
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //     });
                //     describe(`title`, () => {
                //         it(`duplicate title - expect ConflictException`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const tmp2 = await createViaController();
                //             models.push(tmp2);
                //
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid: tmp2.uuid,
                //                 },
                //                 data: {
                //                     title: tmp.title,
                //                 },
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e).toBeInstanceOf(ConflictException);
                //                 });
                //         });
                //         it(`not valid title - expect RMQError`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //
                //             const title = 42;
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid: tmp.uuid,
                //                 },
                //                 data: {
                //                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                     // @ts-ignore
                //                     title,
                //                 },
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //     });
                //     describe(`description`, () => {
                //         it(`not valid description - expect RMQError`, async () => {
                //             const tmp = await createViaController();
                //             models.push(tmp);
                //             const description = 42;
                //             const props: UpdateRequest = {
                //                 where: {
                //                     uuid: tmp.uuid,
                //                 },
                //                 data: {
                //                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //                     // @ts-ignore
                //                     description,
                //                 },
                //             };
                //             await _updateViaRMQ(props)
                //                 .then((res) => {
                //                     expect(res).toBeUndefined();
                //                 })
                //                 .catch((e) => {
                //                     expect(e instanceof RMQError);
                //                 });
                //         });
                //     });
                // });
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
                            where: { uuid: 42 },
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

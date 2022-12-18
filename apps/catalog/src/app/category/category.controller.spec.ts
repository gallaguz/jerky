import { NestApplication } from '@nestjs/core';
import { CategoryController } from './category.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RMQError, RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { CategoryModule } from './category.module';
import {
    CategoryCreateCommandContract,
    CategoryFindFilteredQueryContract,
    CategoryFindOneTitleQueryContract,
    CategoryFindOneUuidQueryContract,
    CategoryRemoveCommandContract,
    CategoryUpdateCommandContract,
} from '@jerky/contracts';
import * as crypto from 'crypto';
import { Generate, Random } from '@jerky/common';
import {
    BadRequestException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@jerky/constants';
import { Category } from '@prisma/client/scripts/catalog-client';

describe('[ Category Controller ]', () => {
    let app: NestApplication;
    let categoryController: CategoryController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                CategoryModule,
            ],
        }).compile();

        app = module.createNestApplication();
        categoryController = app.get<CategoryController>(CategoryController);
        rmqService = app.get(RMQService);
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('[ RMQ ] CRUD', () => {
        const categories: Category[] = [];

        it('[ app ] toBeDefined', function () {
            expect(app).toBeDefined();
        });

        it('[ categoryController ] toBeDefined - success', function () {
            expect(categoryController).toBeDefined();
        });

        describe('[ C ]', () => {
            describe(`Create - (${CategoryCreateCommandContract.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const title: string = crypto.randomUUID();
                    const description: string = crypto.randomUUID();
                    const props: CategoryCreateCommandContract.Request = {
                        title,
                        description,
                    };
                    const res: Category = await rmqService.triggerRoute<
                        CategoryCreateCommandContract.Request,
                        CategoryCreateCommandContract.Response
                    >(CategoryCreateCommandContract.topic, props);

                    expect(res.title).toEqual(title);
                    expect(res.description).toEqual(description);

                    categories.push(res);
                });
            });

            describe(`Validation - (${CategoryCreateCommandContract.topic})`, () => {
                it(`duplicate title - expect ConflictException`, async () => {
                    const { title } = Random.pickObj(categories, 1)[0];

                    const props: CategoryCreateCommandContract.Request = {
                        title,
                    };
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e).toBeInstanceOf(ConflictException);
                    }
                });
                it(`empty props - expect BadRequestException`, async () => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const props: CategoryCreateCommandContract.Request = {};
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof BadRequestException);
                    }
                });
                it(`to short title - expect RMQError`, async () => {
                    const props = {
                        title: <string>Generate.string(3, 'a'),
                    };
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);
                        if (e instanceof RMQError) {
                            expect(e.message).toEqual(
                                ERROR_MESSAGES.TITLE.MUST_BE_LONGER,
                            );
                        } else {
                            throw new Error(
                                ERROR_MESSAGES.SOMETHING_WENT_WRONG,
                            );
                        }
                    }
                });
                it(`to long title - expect RMQError`, async () => {
                    const props = {
                        title: <string>Generate.string(129, 'a'),
                    };
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);
                        if (e instanceof RMQError) {
                            expect(e.message).toEqual(
                                ERROR_MESSAGES.TITLE.MUST_BE_SHORTER,
                            );
                        } else {
                            throw new Error(
                                ERROR_MESSAGES.SOMETHING_WENT_WRONG,
                            );
                        }
                    }
                });
                it(`not valid title - expect  RMQError`, async () => {
                    const props = {
                        title: 42,
                    };
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);
                        if (e instanceof RMQError) {
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_A_STRING,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_SHORTER,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_LONGER,
                                ),
                            ).toBe(true);
                        } else {
                            throw new Error(
                                ERROR_MESSAGES.SOMETHING_WENT_WRONG,
                            );
                        }
                    }
                });
                it(`not valid description - expect RMQError`, async () => {
                    const props = {
                        title: <string>Generate.string(8, 'a'),
                        description: 42,
                    };
                    try {
                        await rmqService.triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                        >(CategoryCreateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);
                        if (e instanceof RMQError) {
                            expect(e.message).toEqual(
                                ERROR_MESSAGES.DESCRIPTION.MUST_BE_A_STRING,
                            );
                        } else {
                            throw new Error(
                                ERROR_MESSAGES.SOMETHING_WENT_WRONG,
                            );
                        }
                    }
                });
            });
        });

        describe('[ R ]', () => {
            describe(`Find One`, () => {
                describe(`(${CategoryFindOneUuidQueryContract.topic}`, () => {
                    it(`correct uuid - success`, async () => {
                        const uuid: string = Random.pickObj(categories, 1)[0]
                            .uuid;
                        const props: CategoryFindOneUuidQueryContract.Request =
                            { uuid };

                        const res = await rmqService.triggerRoute<
                            CategoryFindOneUuidQueryContract.Request,
                            CategoryFindOneUuidQueryContract.Response
                        >(CategoryFindOneUuidQueryContract.topic, props);

                        expect(res).toBeTruthy();
                    });
                });
                describe(`${CategoryFindOneTitleQueryContract.topic}`, () => {
                    it(`correct title - success`, async () => {
                        const title: string = Random.pickObj(categories, 1)[0]
                            .title;

                        const props: CategoryFindOneTitleQueryContract.Request =
                            {
                                title,
                            };

                        const res = await rmqService.triggerRoute<
                            CategoryFindOneTitleQueryContract.Request,
                            CategoryFindOneTitleQueryContract.Response
                        >(CategoryFindOneTitleQueryContract.topic, props);

                        expect(res).toBeTruthy();
                    });
                });

                describe(`Validation - (${CategoryFindOneUuidQueryContract.topic})`, () => {
                    it(`wrong uuid - expect NotFoundException`, async () => {
                        try {
                            const props: CategoryFindOneUuidQueryContract.Request =
                                {
                                    uuid: 'wrongUuid',
                                };
                            await rmqService.triggerRoute<
                                CategoryFindOneUuidQueryContract.Request,
                                CategoryFindOneUuidQueryContract.Response
                            >(CategoryFindOneUuidQueryContract.topic, props);
                        } catch (e) {
                            expect(e instanceof NotFoundException);
                        }
                    });
                    it(`not valid uuid - expect RMQError`, async () => {
                        try {
                            const props: CategoryFindOneUuidQueryContract.Request =
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    uuid: 42,
                                };
                            await rmqService.triggerRoute<
                                CategoryFindOneUuidQueryContract.Request,
                                CategoryFindOneUuidQueryContract.Response
                            >(CategoryFindOneUuidQueryContract.topic, props);
                        } catch (e) {
                            expect(e instanceof RMQError);

                            if (e instanceof RMQError) {
                                expect(
                                    e.message.includes(
                                        ERROR_MESSAGES.UUID.MUST_BE_A_STRING,
                                    ),
                                ).toBe(true);
                                expect(
                                    e.message.includes(
                                        ERROR_MESSAGES.UUID
                                            .MUST_BE_A_VALID_UUID,
                                    ),
                                ).toBe(true);
                            }
                        }
                    });
                });
            });
            describe(`Find Filtered - (${CategoryFindFilteredQueryContract.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const take = 1;
                    const props: CategoryFindFilteredQueryContract.Request = {
                        take,
                    };
                    const res = await rmqService.triggerRoute<
                        CategoryFindFilteredQueryContract.Request,
                        CategoryFindFilteredQueryContract.Response
                    >(CategoryFindFilteredQueryContract.topic, props);

                    expect(res.length).toEqual(take);
                });
                describe(`Validation - (${CategoryFindFilteredQueryContract.topic})`, () => {
                    it(`not valid "take" (string) - expect - RMQError`, async () => {
                        const take = 'string';
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const props: CategoryFindFilteredQueryContract.Request =
                            { take };
                        await rmqService
                            .triggerRoute<
                                CategoryFindFilteredQueryContract.Request,
                                CategoryFindFilteredQueryContract.Response
                            >(CategoryFindFilteredQueryContract.topic, props)
                            .catch((e) => {
                                expect(e).toBeInstanceOf(RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.TAKE
                                                .MUST_BE_A_NUMBER,
                                        ),
                                    ).toBe(true);
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.TAKE
                                                .MUST_NOT_BE_NO_LESS_THEN_1,
                                        ),
                                    ).toBe(true);
                                }
                            });
                    });
                    it(`not valid "skip" (string) - expect - RMQError`, async () => {
                        const skip = 'string';
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const props: CategoryFindFilteredQueryContract.Request =
                            { skip };
                        await rmqService
                            .triggerRoute<
                                CategoryFindFilteredQueryContract.Request,
                                CategoryFindFilteredQueryContract.Response
                            >(CategoryFindFilteredQueryContract.topic, props)
                            .catch((e) => {
                                expect(e).toBeInstanceOf(RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.SKIP
                                                .MUST_BE_A_NUMBER,
                                        ),
                                    ).toBe(true);
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.SKIP
                                                .MUST_NOT_BE_LESS_THEN_ZERO,
                                        ),
                                    ).toBe(true);
                                }
                            });
                    });
                    it(`not valid "orderBy" - expect - RMQError`, async () => {
                        const orderBy = 'up';
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const props: CategoryFindFilteredQueryContract.Request =
                            { orderBy };
                        await rmqService
                            .triggerRoute<
                                CategoryFindFilteredQueryContract.Request,
                                CategoryFindFilteredQueryContract.Response
                            >(CategoryFindFilteredQueryContract.topic, props)
                            .catch((e) => {
                                expect(e).toBeInstanceOf(RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.ORDER_BY
                                                .MUST_BE_ASC_OD_DESC,
                                        ),
                                    ).toBe(true);
                                }
                            });
                    });
                    it(`not valid "searchString" - expect RMQError`, async () => {
                        const searchString = 42;

                        const props: CategoryFindFilteredQueryContract.Request =
                            {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                searchString,
                            };
                        await rmqService
                            .triggerRoute<
                                CategoryFindFilteredQueryContract.Request,
                                CategoryFindFilteredQueryContract.Response
                            >(CategoryFindFilteredQueryContract.topic, props)
                            .catch((e) => {
                                expect(e).toBeInstanceOf(RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.SEARCH_STRING
                                                .MUST_BE_A_STRING,
                                        ),
                                    ).toBe(true);
                                }
                            });
                    });
                });
            });
        });

        describe('[ U ]', () => {
            describe(`Update - (${CategoryUpdateCommandContract.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const tmpCategory = await rmqService.triggerRoute<
                        CategoryCreateCommandContract.Request,
                        CategoryCreateCommandContract.Response
                    >(CategoryCreateCommandContract.topic, <
                        CategoryCreateCommandContract.Request
                    >{
                        title: crypto.randomUUID(),
                        description: crypto.randomUUID(),
                    });

                    categories.push(tmpCategory);

                    const title = crypto.randomUUID();
                    const description = crypto.randomUUID();
                    const props: CategoryUpdateCommandContract.Request = {
                        uuid: tmpCategory.uuid,
                        title,
                        description,
                    };
                    const res: Category = await rmqService.triggerRoute<
                        CategoryUpdateCommandContract.Request,
                        CategoryUpdateCommandContract.Response
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                    >(CategoryUpdateCommandContract.topic, props);

                    expect(res.uuid).toEqual(tmpCategory.uuid);
                    expect(res.title).toEqual(title);
                    expect(res.description).toEqual(description);
                });
            });

            describe(`Validation - (${CategoryUpdateCommandContract.topic})`, () => {
                it(`duplicate title - expect ConflictException`, async () => {
                    try {
                        const arr: Category[] = await rmqService.triggerRoute<
                            CategoryFindFilteredQueryContract.Request,
                            CategoryFindFilteredQueryContract.Response
                        >(CategoryFindFilteredQueryContract.topic, { take: 1 });

                        const { title } = arr[0];

                        const { uuid } = Random.pickObj(categories, 1)[0];
                        const props: CategoryUpdateCommandContract.Request = {
                            uuid,
                            title,
                        };

                        await rmqService.triggerRoute<
                            CategoryUpdateCommandContract.Request,
                            CategoryUpdateCommandContract.Response
                        >(CategoryUpdateCommandContract.topic, props);
                    } catch (e) {
                        expect(e).toBeInstanceOf(ConflictException);
                    }
                });
                it(`empty props - expect RMQError`, async () => {
                    try {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const props: CategoryUpdateCommandContract.Request = {};
                        await rmqService.triggerRoute<
                            CategoryUpdateCommandContract.Request,
                            CategoryUpdateCommandContract.Response
                        >(CategoryUpdateCommandContract.topic, props);
                    } catch (e) {
                        expect(e).toBeInstanceOf(RMQError);

                        if (e instanceof RMQError) {
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.UUID.MUST_BE_A_STRING,
                                ),
                            ).toBe(true);
                        }
                    }
                });
                it(`wrong uuid - expect NotFoundException`, async () => {
                    try {
                        const props: CategoryUpdateCommandContract.Request = {
                            uuid: 'wrongUuid',
                            title: crypto.randomUUID(),
                        };
                        await rmqService.triggerRoute<
                            CategoryUpdateCommandContract.Request,
                            CategoryUpdateCommandContract.Response
                        >(CategoryUpdateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
                it(`not valid uuid - expect RMQError`, async () => {
                    try {
                        const props: CategoryUpdateCommandContract.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            uuid: 42,
                            title: crypto.randomUUID(),
                        };
                        await rmqService.triggerRoute<
                            CategoryUpdateCommandContract.Request,
                            CategoryUpdateCommandContract.Response
                        >(CategoryUpdateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);

                        if (e instanceof RMQError) {
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.UUID.MUST_BE_A_STRING,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID,
                                ),
                            ).toBe(true);
                        }
                    }
                });
                it(`not valid title - expect RMQError`, async () => {
                    try {
                        const arr: Category[] = await rmqService.triggerRoute<
                            CategoryFindFilteredQueryContract.Request,
                            CategoryFindFilteredQueryContract.Response
                        >(CategoryFindFilteredQueryContract.topic, { take: 1 });

                        const { uuid } = arr[0];

                        const props: CategoryUpdateCommandContract.Request = {
                            uuid,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            title: 42,
                        };
                        await rmqService.triggerRoute<
                            CategoryUpdateCommandContract.Request,
                            CategoryUpdateCommandContract.Response
                        >(CategoryUpdateCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);

                        if (e instanceof RMQError) {
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_A_STRING,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_SHORTER,
                                ),
                            ).toBe(true);
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.TITLE.MUST_BE_LONGER,
                                ),
                            ).toBe(true);
                        }
                    }
                });
            });
        });

        describe('[ D ]', () => {
            describe(`Remove - (${CategoryRemoveCommandContract.topic})`, () => {
                it(`expect removed category.uuid = passed.uuid`, async () => {
                    const tmpProps: CategoryCreateCommandContract.Request = {
                        title: crypto.randomUUID(),
                        description: crypto.randomUUID(),
                    };

                    await rmqService
                        .triggerRoute<
                            CategoryCreateCommandContract.Request,
                            CategoryCreateCommandContract.Response
                        >(CategoryCreateCommandContract.topic, tmpProps)
                        .then(async ({ uuid }) => {
                            const props = {
                                uuid,
                            };
                            const res = await rmqService.triggerRoute<
                                CategoryRemoveCommandContract.Request,
                                CategoryRemoveCommandContract.Response
                            >(CategoryRemoveCommandContract.topic, props);

                            expect(res.uuid).toEqual(uuid);
                        });
                });
            });

            describe(`Validation - (${CategoryRemoveCommandContract.topic})`, () => {
                it(`wrong uuid - expect NotFoundException`, async () => {
                    try {
                        const props = {
                            uuid: 'wrongUuid',
                        };
                        await rmqService.triggerRoute<
                            CategoryRemoveCommandContract.Request,
                            CategoryRemoveCommandContract.Response
                        >(CategoryRemoveCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
                it(`not valid uuid (number) - expect NotFoundException`, async () => {
                    try {
                        const props = {
                            uuid: 42,
                        };

                        await rmqService.triggerRoute<
                            CategoryRemoveCommandContract.Request,
                            CategoryRemoveCommandContract.Response
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                        >(CategoryRemoveCommandContract.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
            });

            it('Remove All created records', async () => {
                const tmp: string[] = [];
                for (const category of categories) {
                    const props: CategoryRemoveCommandContract.Request = {
                        uuid: category.uuid,
                    };
                    await rmqService
                        .triggerRoute<
                            CategoryRemoveCommandContract.Request,
                            CategoryRemoveCommandContract.Response
                        >(CategoryRemoveCommandContract.topic, props)
                        .then(({ uuid }) => {
                            tmp.push(uuid);
                            expect(uuid).toEqual(category.uuid);
                        });
                }

                expect(categories.length).toEqual(tmp.length);

                categories.length = 0;
                tmp.length = 0;
            });
        });
    });
});

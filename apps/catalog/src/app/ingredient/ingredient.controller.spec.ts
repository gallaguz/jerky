import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RMQError, RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import {
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOneTitle,
    IngredientFindOneUuid,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import * as crypto from 'crypto';
import { Generate, Random } from '@jerky/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@jerky/constants';
import {
    Ingredient,
    IngredientForm,
} from '@prisma/client/scripts/catalog-client';
import { IngredientController } from './ingredient.controller';
import { IngredientModule } from './ingredient.module';

describe('[Ingredient Controller]', () => {
    let app: NestApplication;
    let ingredientController: IngredientController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                IngredientModule,
            ],
        }).compile();

        app = module.createNestApplication();
        ingredientController =
            app.get<IngredientController>(IngredientController);
        rmqService = app.get(RMQService);
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('[RMQ] CRUD', () => {
        const ingredients: Ingredient[] = [];

        it('[app] toBeDefined', function () {
            expect(app).toBeDefined();
        });

        it('[ingredientController] toBeDefined - success', function () {
            expect(ingredientController).toBeDefined();
        });

        describe('[ C ]', () => {
            describe(`Create - (${IngredientCreate.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const title: string = crypto.randomUUID();
                    const price: number = Random.pickNumber();
                    const description: string = crypto.randomUUID();
                    const props: IngredientCreate.Request = {
                        title,
                        price,
                        form: Random.pickKey(IngredientForm),
                        description,
                    };
                    const res: Ingredient = await rmqService.triggerRoute<
                        IngredientCreate.Request,
                        IngredientCreate.Response
                    >(IngredientCreate.topic, props);

                    expect(res.title).toEqual(title);
                    expect(res.price).toEqual(price);
                    expect(res.description).toEqual(description);

                    ingredients.push(res);
                });
            });

            describe(`Validation - (${IngredientCreate.topic})`, () => {
                it(`empty props - expect BadRequestException`, async () => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const props: IngredientCreate.Request = {};
                    try {
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                        >(IngredientCreate.topic, props);
                    } catch (e) {
                        expect(e instanceof BadRequestException);
                    }
                });
                it(`to short title - expect RMQError`, async () => {
                    const props: IngredientCreate.Request = {
                        title: <string>Generate.string(3, 'a'),
                        price: Random.pickNumber(),
                        form: Random.pickKey(IngredientForm),
                    };
                    try {
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                        >(IngredientCreate.topic, props);
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
                    const props: IngredientCreate.Request = {
                        title: <string>Generate.string(129, 'a'),
                        price: Random.pickNumber(),
                        form: Random.pickKey(IngredientForm),
                    };
                    try {
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                        >(IngredientCreate.topic, props);
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
                    const props: IngredientCreate.Request = {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        title: 42,
                    };
                    try {
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                        >(IngredientCreate.topic, props);
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
                    const props: IngredientCreate.Request = {
                        title: <string>Generate.string(8, 'a'),
                        price: Random.pickNumber(),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        description: 42,
                    };
                    try {
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                        >(IngredientCreate.topic, props);
                    } catch (e) {
                        expect(e instanceof RMQError);
                        if (e instanceof RMQError) {
                            expect(
                                e.message.includes(
                                    ERROR_MESSAGES.DESCRIPTION.MUST_BE_A_STRING,
                                ),
                            ).toEqual(true);
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
                describe(`(${IngredientFindOneUuid.topic})`, () => {
                    it(`correct uuid - success`, async () => {
                        const uuid: string = Random.pickObj(ingredients, 1)[0]
                            .uuid;
                        const props: IngredientFindOneUuid.Request = { uuid };

                        const res = await rmqService.triggerRoute<
                            IngredientFindOneUuid.Request,
                            IngredientFindOneUuid.Response
                        >(IngredientFindOneUuid.topic, props);

                        expect(res).toBeTruthy();
                    });

                    describe(`Validation`, () => {
                        it(`wrong uuid - expect NotFoundException`, async () => {
                            try {
                                const props: IngredientFindOneUuid.Request = {
                                    uuid: 'wrong uuid',
                                };
                                await rmqService.triggerRoute<
                                    IngredientFindOneUuid.Request,
                                    IngredientFindOneUuid.Response
                                >(IngredientFindOneUuid.topic, props);
                            } catch (e) {
                                expect(e instanceof NotFoundException);
                            }
                        });
                        it(`not valid uuid - expect RMQError`, async () => {
                            try {
                                const props: IngredientFindOneUuid.Request = {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    uuid: 42,
                                };
                                await rmqService.triggerRoute<
                                    IngredientFindOneUuid.Request,
                                    IngredientFindOneUuid.Response
                                >(IngredientFindOneUuid.topic, props);
                            } catch (e) {
                                expect(e instanceof RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.UUID
                                                .MUST_BE_A_STRING,
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

                describe(`(${IngredientFindOneTitle.topic})`, () => {
                    it(`correct title - success`, async () => {
                        const title: string = Random.pickObj(ingredients, 1)[0]
                            .title;
                        const props: IngredientFindOneTitle.Request = { title };

                        const res = await rmqService.triggerRoute<
                            IngredientFindOneTitle.Request,
                            IngredientFindOneTitle.Response
                        >(IngredientFindOneTitle.topic, props);

                        expect(res).toBeTruthy();
                    });

                    describe(`Validation`, () => {
                        it(`wrong title - expect NotFoundException`, async () => {
                            try {
                                const props: IngredientFindOneTitle.Request = {
                                    title: 'wrong title',
                                };
                                await rmqService.triggerRoute<
                                    IngredientFindOneTitle.Request,
                                    IngredientFindOneTitle.Response
                                >(IngredientFindOneTitle.topic, props);
                            } catch (e) {
                                expect(e instanceof NotFoundException);
                            }
                        });
                        it(`not valid title - expect RMQError`, async () => {
                            try {
                                const props: IngredientFindOneTitle.Request = {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    title: 42,
                                };
                                await rmqService.triggerRoute<
                                    IngredientFindOneTitle.Request,
                                    IngredientFindOneTitle.Response
                                >(IngredientFindOneTitle.topic, props);
                            } catch (e) {
                                expect(e instanceof RMQError);

                                if (e instanceof RMQError) {
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.TITLE
                                                .MUST_BE_A_STRING,
                                        ),
                                    ).toBe(true);
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.TITLE.MUST_BE_LONGER,
                                        ),
                                    ).toBe(true);
                                    expect(
                                        e.message.includes(
                                            ERROR_MESSAGES.TITLE
                                                .MUST_BE_SHORTER,
                                        ),
                                    ).toBe(true);
                                }
                            }
                        });
                    });
                });
            });
            describe(`Find Filtered - (${IngredientFindFiltered.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const take = 1;
                    const props: IngredientFindFiltered.Request = { take };
                    const res = await rmqService.triggerRoute<
                        IngredientFindFiltered.Request,
                        IngredientFindFiltered.Response
                    >(IngredientFindFiltered.topic, props);

                    expect(res.length).toEqual(take);
                });
                describe(`Validation - (${IngredientFindFiltered.topic})`, () => {
                    it(`not valid "take" (string) - expect - RMQError`, async () => {
                        const take = 'string';

                        const props: IngredientFindFiltered.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            take,
                        };
                        await rmqService
                            .triggerRoute<
                                IngredientFindFiltered.Request,
                                IngredientFindFiltered.Response
                            >(IngredientFindFiltered.topic, props)
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
                        const props: IngredientFindFiltered.Request = { skip };
                        await rmqService
                            .triggerRoute<
                                IngredientFindFiltered.Request,
                                IngredientFindFiltered.Response
                            >(IngredientFindFiltered.topic, props)
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

                        const props: IngredientFindFiltered.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            orderBy,
                        };
                        await rmqService
                            .triggerRoute<
                                IngredientFindFiltered.Request,
                                IngredientFindFiltered.Response
                            >(IngredientFindFiltered.topic, props)
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

                        const props: IngredientFindFiltered.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            searchString,
                        };
                        await rmqService
                            .triggerRoute<
                                IngredientFindFiltered.Request,
                                IngredientFindFiltered.Response
                            >(IngredientFindFiltered.topic, props)
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
            describe(`Update - (${IngredientUpdate.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const tmpIngredient: Ingredient =
                        await rmqService.triggerRoute<
                            IngredientCreate.Request,
                            IngredientCreate.Response
                        >(IngredientCreate.topic, <IngredientCreate.Request>{
                            title: crypto.randomUUID(),
                            description: crypto.randomUUID(),
                            form: Random.pickKey(IngredientForm),
                            price: Random.pickNumber(),
                        });

                    ingredients.push(tmpIngredient);

                    const title: string = crypto.randomUUID();
                    const description: string = crypto.randomUUID();
                    const form: IngredientForm = Random.pickKey(IngredientForm);
                    const price: number = Random.pickNumber();

                    const props: IngredientUpdate.Request = {
                        uuid: tmpIngredient.uuid,
                        title,
                        form,
                        description,
                        price,
                    };

                    const res = await rmqService.triggerRoute<
                        IngredientUpdate.Request,
                        IngredientUpdate.Response
                    >(IngredientUpdate.topic, props);

                    expect(res.uuid).toEqual(tmpIngredient.uuid);
                    expect(res.title).toEqual(title);
                    expect(res.description).toEqual(description);
                    expect(res.price).toEqual(price);
                    expect(res.form).toEqual(form);
                });
            });

            describe(`Validation - (${IngredientUpdate.topic})`, () => {
                it(`wrong uuid - expect NotFoundException`, async () => {
                    try {
                        const props: IngredientUpdate.Request = {
                            uuid: 'wrong uuid',
                            title: crypto.randomUUID(),
                            price: Random.pickNumber(),
                        };
                        await rmqService.triggerRoute<
                            IngredientUpdate.Request,
                            IngredientUpdate.Response
                        >(IngredientUpdate.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
                it(`not valid uuid - expect RMQError`, async () => {
                    try {
                        const props: IngredientUpdate.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            uuid: 42,
                            title: crypto.randomUUID(),
                        };
                        await rmqService.triggerRoute<
                            IngredientUpdate.Request,
                            IngredientUpdate.Response
                        >(IngredientUpdate.topic, props);
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
                        const uuid = Random.pickObj(ingredients)[0].uuid;

                        const props: IngredientUpdate.Request = {
                            uuid,
                            price: Random.pickNumber(),
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            title: 42,
                        };
                        await rmqService.triggerRoute<
                            IngredientUpdate.Request,
                            IngredientUpdate.Response
                        >(IngredientUpdate.topic, props);
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
            describe(`Remove - (${IngredientRemove.topic})`, () => {
                it(`expect removed ingredient.uuid = passed.uuid`, async () => {
                    const tmpProps: IngredientCreate.Request = {
                        title: crypto.randomUUID(),
                        description: crypto.randomUUID(),
                        price: Random.pickNumber(),
                    };

                    const tmpIngredient = await rmqService.triggerRoute<
                        IngredientCreate.Request,
                        IngredientCreate.Response
                    >(IngredientCreate.topic, tmpProps);

                    const props: IngredientRemove.Request = {
                        uuid: tmpIngredient.uuid,
                    };
                    const res = await rmqService.triggerRoute<
                        IngredientRemove.Request,
                        IngredientRemove.Response
                    >(IngredientRemove.topic, props);

                    expect(res.uuid).toEqual(tmpIngredient.uuid);
                });
            });

            describe(`Validation - (${IngredientRemove.topic})`, () => {
                it(`wrong uuid - expect NotFoundException`, async () => {
                    try {
                        const props: IngredientRemove.Request = {
                            uuid: 'wrongUuid',
                        };
                        await rmqService.triggerRoute<
                            IngredientRemove.Request,
                            IngredientRemove.Response
                        >(IngredientRemove.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
                it(`not valid uuid (number) - expect NotFoundException`, async () => {
                    try {
                        const props: IngredientRemove.Request = {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            uuid: 42,
                        };

                        await rmqService.triggerRoute<
                            IngredientRemove.Request,
                            IngredientRemove.Response
                        >(IngredientRemove.topic, props);
                    } catch (e) {
                        expect(e instanceof NotFoundException);
                    }
                });
            });

            it('Remove All created records', async () => {
                const tmp: string[] = [];
                for (const ingredient of ingredients) {
                    const props: IngredientRemove.Request = {
                        uuid: ingredient.uuid,
                    };
                    const res = await rmqService.triggerRoute<
                        IngredientRemove.Request,
                        IngredientRemove.Response
                    >(IngredientRemove.topic, props);

                    tmp.push(res.uuid);
                    expect(res.uuid).toEqual(ingredient.uuid);
                }

                expect(ingredients.length).toEqual(tmp.length);

                ingredients.length = 0;
                tmp.length = 0;
            });
        });
    });
});

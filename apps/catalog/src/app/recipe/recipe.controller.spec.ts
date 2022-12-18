import {
    RecipeCreate,
    RecipeFindFiltered,
    RecipeFindOneTitle,
    RecipeFindOneUuid,
    RecipeRemove,
    RecipeUpdate,
} from '@jerky/contracts';
import * as crypto from 'crypto';
import { NestApplication } from '@nestjs/core';
import { RecipeController } from './recipe.controller';
import { RMQModule, RMQService } from 'nestjs-rmq';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RecipeModule } from './recipe.module';
import { Recipe } from '@prisma/client/scripts/catalog-client';

describe(`[ Recipe Contorller ]`, () => {
    let app: NestApplication;
    let recipeController: RecipeController;
    let rmqService: RMQService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                RecipeModule,
            ],
        }).compile();

        app = module.createNestApplication();
        recipeController = app.get<RecipeController>(RecipeController);
        rmqService = app.get(RMQService);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe(`[ RMQ ] CRUD`, () => {
        const recipes: Recipe[] = [];

        it('[ app ] toBeDefined', function () {
            expect(app).toBeDefined();
        });

        it('[ recipeController ] toBeDefined - success', function () {
            expect(recipeController).toBeDefined();
        });

        describe('[ C ]', () => {
            describe(`Create - (${RecipeCreate.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    const title: string = crypto.randomUUID();
                    const description: string = crypto.randomUUID();
                    const recipeTypeUuid = '';
                    const categoryUuid = '';
                    const rawUuid = '';
                });
            });

            describe(`Validation - (${RecipeCreate.topic})`, () => {
                it(`duplicate title - expect ConflictException`, async () => {
                    //
                });
                it(`empty props - expect BadRequestException`, async () => {
                    //
                });
                it(`to short title - expect RMQError`, async () => {
                    //
                });
                it(`to long title - expect RMQError`, async () => {
                    //
                });
                it(`not valid title - expect  RMQError`, async () => {
                    //
                });
                it(`not valid description - expect RMQError`, async () => {
                    //
                });
            });
        });

        describe('[ R ]', () => {
            describe(`Find One`, () => {
                describe(`(${RecipeFindOneUuid.topic}`, () => {
                    it(`correct uuid - success`, async () => {
                        //
                    });
                });
                describe(`${RecipeFindOneTitle.topic}`, () => {
                    it(`correct title - success`, async () => {
                        //
                    });
                });

                describe(`Validation - (${RecipeFindOneUuid.topic})`, () => {
                    it(`wrong uuid - expect NotFoundException`, async () => {
                        //
                    });
                    it(`not valid uuid - expect RMQError`, async () => {
                        //
                    });
                });
            });
            describe(`Find Filtered - (${RecipeFindFiltered.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    //
                });
                describe(`Validation - (${RecipeFindFiltered.topic})`, () => {
                    it(`not valid "take" (string) - expect - RMQError`, async () => {
                        //
                    });
                    it(`not valid "skip" (string) - expect - RMQError`, async () => {
                        //
                    });
                    it(`not valid "orderBy" - expect - RMQError`, async () => {
                        //
                    });
                    it(`not valid "searchString" - expect RMQError`, async () => {
                        //
                    });
                });
            });
        });

        describe('[ U ]', () => {
            describe(`Update - (${RecipeUpdate.topic})`, () => {
                it(`correct props - expect success`, async () => {
                    //
                });
            });

            describe(`Validation - (${RecipeUpdate.topic})`, () => {
                it(`duplicate title - expect ConflictException`, async () => {
                    //
                });
                it(`empty props - expect RMQError`, async () => {
                    //
                });
                it(`wrong uuid - expect NotFoundException`, async () => {
                    //
                });
                it(`not valid uuid - expect RMQError`, async () => {
                    //
                });
                it(`not valid title - expect RMQError`, async () => {
                    //
                });
            });
        });

        describe('[ D ]', () => {
            describe(`Remove - (${RecipeRemove.topic})`, () => {
                it(`expect removed recipe.uuid = passed.uuid`, async () => {
                    //
                });
            });

            describe(`Validation - (${RecipeRemove.topic})`, () => {
                it(`wrong uuid - expect NotFoundException`, async () => {
                    //
                });
                it(`not valid uuid (number) - expect NotFoundException`, async () => {
                    //
                });
            });

            it('Remove All created records', async () => {
                //
            });
        });
    });
});

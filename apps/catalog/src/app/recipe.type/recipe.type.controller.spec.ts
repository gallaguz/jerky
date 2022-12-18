import { NestApplication } from '@nestjs/core';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RecipeTypeController } from './recipe.type.controller';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { RecipeTypeModule } from './recipe.type.module';

describe(`[ RecipeType Controller ]`, () => {
    let app: NestApplication;
    let recipeTypeController: RecipeTypeController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                RecipeTypeModule,
            ],
        }).compile();

        app = module.createNestApplication();
        recipeTypeController =
            app.get<RecipeTypeController>(RecipeTypeController);
        rmqService = app.get(RMQService);
        await app.init();
    });

    describe(`[ RMQ ] CRUD`, () => {
        const recipeTypes: RecipeType[] = [];

        it('[ app ] toBeDefined', function () {
            expect(app).toBeDefined();
        });
    });
});

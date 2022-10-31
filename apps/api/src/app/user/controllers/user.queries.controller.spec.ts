import { NestApplication } from '@nestjs/core';
import { RMQModule } from 'nestjs-rmq';
import { UserQueriesController } from './user.queries.controller';
import { UserCreate, UserDelete, UserHealthCheck } from '@jerky/contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../../app.module';
import { ENVConfig, RMQConfig } from '../../../configs';
import { faker } from '@faker-js/faker';
import { UserCommandsController } from './user.commands.controller';
import { hashSync } from 'bcryptjs';

let fakeUser: UserCreate.Request;
let createdInDbFakeUser: UserCreate.Response;

describe('[Api User] Query Controller', () => {
    let app: NestApplication;
    let userQueryController: UserQueriesController;
    let userCommandsController: UserCommandsController;

    beforeAll(async () => {
        fakeUser = {
            email: faker.internet.email(),
            passwordHash: hashSync(faker.internet.password(), 10),
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                AppModule,
            ],
        }).compile();

        app = module.createNestApplication();

        userQueryController = app.get<UserQueriesController>(
            UserQueriesController,
        );
        userCommandsController = app.get<UserCommandsController>(
            UserCommandsController,
        );

        await app.init();

        const res = await userCommandsController.create(fakeUser);

        if (res) {
            createdInDbFakeUser = res;
        }

        expect(createdInDbFakeUser).toBeDefined();
    });

    afterAll(async () => {
        if (createdInDbFakeUser) {
            await userCommandsController.delete(<UserDelete.Request>{
                uuid: createdInDbFakeUser.uuid,
            });
        }

        await app.close();
    });

    it('[HealthCheck] [expect true]', async () => {
        await expect(await userQueryController.healthCheck()).toEqual(<
            UserHealthCheck.Response
        >{ pong: true });
    });
});

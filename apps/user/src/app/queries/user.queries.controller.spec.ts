import {
    UserCreate,
    UserRemoveEvent,
    UserFindByEmail,
    UserFindByUuid,
    UserFindFiltered,
    UserHealthCheck,
} from '@jerky/contracts';
import { NestApplication } from '@nestjs/core';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ENVConfig } from '../../configs/env.config';
import { faker } from '@faker-js/faker';
import { UserQueriesController } from './user.queries.controller';
import { NotFoundException } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserCommandsController } from '../commands/user.commands.controller';
import { UserEventsController } from '../events/user.events.controller';
import { UserEventEmitter } from '../event.emitters/user.event.emitter';
import { UserQueriesService } from './user.queries.service';
import { UserEventsService } from '../events/user.events.service';
import { UserCommandsService } from '../commands/user.commands.service';
import { UserRepository } from '../repositories/user.repository';
import { IUser, OrderBy, Role } from '@jerky/interfaces';

const CONSTANTS = {
    WRONG_PASSWORD: 'wrong_password',
    WRONG_EMAIL: 'wrong@email.com',
    WRONG_UUID: '6784df71-4dbc-4a5a-b1bf-7a35bdb5dc4e',
};

let fakeUser: UserCreate.Request;
let createdInDbFakeUser: IUser;

describe('[User] Query Controller', () => {
    let app: NestApplication;
    let rmqService: RMQTestService;
    let userQueryController: UserQueriesController;

    beforeAll(async () => {
        fakeUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: Role.CUSTOMER,
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                DatabaseModule,
            ],
            controllers: [
                UserCommandsController,
                UserQueriesController,
                UserEventsController,
            ],
            providers: [
                UserEventEmitter,
                UserQueriesService,
                UserEventsService,
                UserCommandsService,
                UserRepository,
            ],
        }).compile();

        app = module.createNestApplication();

        userQueryController = app.get<UserQueriesController>(
            UserQueriesController,
        );

        rmqService = app.get(RMQService);

        await app.init();

        createdInDbFakeUser = await rmqService.triggerRoute<
            UserCreate.Request,
            UserCreate.Response
        >(UserCreate.topic, fakeUser);
    });

    afterAll(async () => {
        await rmqService.triggerRoute<
            UserRemoveEvent.Request,
            UserRemoveEvent.Response
        >(UserRemoveEvent.topic, { uuid: createdInDbFakeUser.uuid });
        await app.close();
    });

    it('[HealthCheck] [expect true]', async () => {
        await expect(await userQueryController.healthCheck()).toEqual(<
            UserHealthCheck.Response
        >{ pong: true });
    });

    describe('[FIND BY UUID]', () => {
        it('Correct uuid [expect toBeDefined]', async () => {
            await expect(
                await userQueryController.findOneByUuid(<
                    UserFindByUuid.Request
                >{
                    uuid: createdInDbFakeUser.uuid,
                }),
            ).toBeDefined();
        });

        it('Wrong uuid [expect NotFoundException]', async () => {
            let err;

            try {
                await expect(
                    await userQueryController.findOneByUuid(<
                        UserFindByUuid.Request
                    >{
                        uuid: CONSTANTS.WRONG_UUID,
                    }),
                ).toBeNull();
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(NotFoundException);
        });
    });

    describe('[FIND BY EMAIL]', () => {
        it('Correct email [expect toBeDefined] ', async () => {
            await expect(
                await userQueryController.findOneByEmail(<
                    UserFindByEmail.Request
                >{
                    email: createdInDbFakeUser.email,
                }),
            ).toBeDefined();
        });

        it('Wrong email [expect NotFoundException] ', async () => {
            let err;

            try {
                await userQueryController.findOneByEmail(<
                    UserFindByEmail.Request
                >{
                    email: CONSTANTS.WRONG_EMAIL,
                });
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(NotFoundException);
        });
    });

    describe('[Find Filtered]', () => {
        it('No conditions', async () => {
            const res = await userQueryController.findFiltered(
                <UserFindFiltered.Request>{},
            );

            expect(res).toBeDefined();
        });

        it('Take 1, Skip 0', async () => {
            const res = await userQueryController.findFiltered(<
                UserFindFiltered.Request
            >{ take: 1, skip: 0 });

            expect(res.length).toEqual(1);
        });

        it('Asc', async () => {
            const res = await userQueryController.findFiltered(<
                UserFindFiltered.Request
            >{ orderBy: OrderBy.ASC });

            expect(res).toBeDefined();
        });

        it('Desc', async () => {
            const res = await userQueryController.findFiltered(<
                UserFindFiltered.Request
            >{ orderBy: OrderBy.DESC });

            expect(res[0].uuid).toEqual(createdInDbFakeUser.uuid);
        });

        it('searchString = createdInDbFakeUser.email', async () => {
            const res = await userQueryController.findFiltered(<
                UserFindFiltered.Request
            >{ searchString: createdInDbFakeUser.email });

            expect(
                res.filter((el) => {
                    return el.email === createdInDbFakeUser.email;
                }).length,
            ).toEqual(1);
        });
    });
});

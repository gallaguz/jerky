import {
    UserCreate,
    UserRemoveEvent,
    UserUpdate,
    UserUpdatePassword,
    UserUpdateRole,
} from '@jerky/contracts';
import { NestApplication } from '@nestjs/core';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ENVConfig } from '../../configs/env.config';
import { faker } from '@faker-js/faker';
import { DatabaseModule } from '../database/database.module';
import { UserCommandsController } from './user.commands.controller';
import { AppModule } from '../app.module';
import { IUser, Role } from '@jerky/interfaces';
import { UserEntity } from '../entities/user.entity';

let createdInDbFakeUser: IUser;
let createdInDbFakeUser2: IUser;

describe('[User] Commands Controller', () => {
    let app: NestApplication;
    let userCommandsController: UserCommandsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                AppModule,
                DatabaseModule,
            ],
        }).compile();

        app = module.createNestApplication();

        userCommandsController = app.get<UserCommandsController>(
            UserCommandsController,
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('[CREATE]', async () => {
        const user = await userCommandsController.create(<UserCreate.Request>{
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: Role.ADMIN,
        });
        createdInDbFakeUser = user;
        expect(user).toBeDefined();
    });

    it('[CREATE] Without Role', async () => {
        const user = await userCommandsController.create(<UserCreate.Request>{
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        createdInDbFakeUser2 = user;
        expect(user).toBeDefined();
    });

    it('[UPDATE PASSWORD]', async () => {
        const newPassword = faker.internet.password();

        const user = await userCommandsController.updatePassword(<
            UserUpdatePassword.Request
        >{
            uuid: createdInDbFakeUser.uuid,
            password: newPassword,
        });

        const userEntity = new UserEntity(user.email, user.passwordHash);

        expect(userEntity).toBeDefined();
        expect(await userEntity.validatePassword(newPassword)).toEqual(true);
    });

    it('[UPDATE EMAIL]', async () => {
        const newEmail = faker.internet.email();
        const user = await userCommandsController.updateEmail(<
            UserUpdate.Request
        >{
            uuid: createdInDbFakeUser.uuid,
            email: newEmail,
        });

        expect(user).toBeDefined();
        expect(user.email).toEqual(newEmail);
        expect(createdInDbFakeUser.email !== user.email).toEqual(true);
    });

    it('[UPDATE ROLE]', async () => {
        const newRole = Role.MODERATOR;
        const user = await userCommandsController.updateRole(<
            UserUpdateRole.Request
        >{
            uuid: createdInDbFakeUser.uuid,
            role: newRole,
        });

        expect(user).toBeDefined();
        expect(user.role).toEqual(newRole);
        expect(createdInDbFakeUser.role !== user.role).toEqual(true);
    });

    it('[DELETE]', async () => {
        const user = await userCommandsController.delete(<
            UserRemoveEvent.Request
        >{
            uuid: createdInDbFakeUser.uuid,
        });
        expect(user).toBeDefined();

        const user2 = await userCommandsController.delete(<
            UserRemoveEvent.Request
        >{
            uuid: createdInDbFakeUser2.uuid,
        });
        expect(user2).toBeDefined();
    });
});

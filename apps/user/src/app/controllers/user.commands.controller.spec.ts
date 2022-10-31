import {
    UserCreate,
    UserDelete,
    UserUpdateEmail,
    UserUpdatePasswordHash,
    UserUpdateRole,
} from '@jerky/contracts';
import { NestApplication } from '@nestjs/core';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ENVConfig } from '../../configs/env.config';
import { faker } from '@faker-js/faker';
import { Role, User } from '@prisma/client';
import { DatabaseModule } from '../db/database.module';
import { UserCommandsController } from './user.commands.controller';
import { compare, hashSync } from 'bcryptjs';
import { AppModule } from '../app.module';

let createdInDbFakeUser: User;
let createdInDbFakeUser2: User;

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
        const user = await userCommandsController.create({
            email: faker.internet.email(),
            passwordHash: hashSync(faker.internet.password(), 10),
            role: Role.CUSTOMER,
        });
        createdInDbFakeUser = user;
        expect(user).toBeDefined();
    });

    it('[CREATE] Without Role', async () => {
        const user = await userCommandsController.create(<UserCreate.Request>{
            email: faker.internet.email(),
            passwordHash: hashSync(faker.internet.password(), 10),
        });
        createdInDbFakeUser2 = user;
        expect(user).toBeDefined();
    });

    it('[UPDATE PASSWORD HASH]', async () => {
        const newPassword = faker.internet.password();
        const newPasswordHash = hashSync(newPassword, 10);

        const user = await userCommandsController.updatePasswordHash(<
            UserUpdatePasswordHash.Request
        >{
            uuid: createdInDbFakeUser.uuid,
            passwordHash: newPasswordHash,
        });

        expect(user).toBeDefined();
        expect(user.passwordHash).toEqual(newPasswordHash);
        expect(await compare(newPassword, user.passwordHash));
    });

    it('[UPDATE EMAIL]', async () => {
        const newEmail = faker.internet.email();
        const user = await userCommandsController.updateEmail(<
            UserUpdateEmail.Request
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
        const user = await userCommandsController.delete(<UserDelete.Request>{
            uuid: createdInDbFakeUser.uuid,
        });
        expect(user).toBeDefined();

        const user2 = await userCommandsController.delete(<UserDelete.Request>{
            uuid: createdInDbFakeUser2.uuid,
        });
        expect(user2).toBeDefined();
    });
});

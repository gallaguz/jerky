import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RMQModule } from 'nestjs-rmq';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '../../config/JWTConfig';

import { AuthModule } from '../auth.module';
import { NestApplication } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthRegister } from '@jerky/contracts';

describe('', () => {
    let app: NestApplication;
    let authController: AuthController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forTest({}),
                JwtModule.registerAsync(JWTConfig()),
                AuthModule,
            ],
        }).compile();

        app = module.createNestApplication();
        authController = app.get<AuthController>(AuthController);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('', () => {
        it('should ', async () => {
            const { accessToken, refreshToken }: AuthRegister.Response =
                await authController.register({
                    email: 'lol23@lol.com',
                    password: 'password',
                });
            console.log('---', accessToken, refreshToken);
        });
    });
});

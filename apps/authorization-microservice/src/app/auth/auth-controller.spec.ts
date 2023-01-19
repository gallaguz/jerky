import { ContractsValidationService, UUIDService } from '@jerky/common';
import {
    InternalAuthHealthCheckQueryContract,
    InternalUserHealthCheckQueryContract,
} from '@jerky/contracts';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RMQModule, RMQService } from 'nestjs-rmq';

import { JwtConfig, RmqConfig } from '../../config';
import { DatabaseModule } from '../../database/database.module';
import { AuthController } from './auth-controller';
import { AuthService } from './auth-service';
import { AuthUserService } from './auth-user.service';
import { PasswordService } from './password-service';
import { TokenRepository } from './token-repository';
import { TokenService } from './token-service';

describe('[ Auth Microservice ]', () => {
    let app: INestApplication;
    let controller: AuthController;
    let rmqService: RMQService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true }),
                RMQModule.forRootAsync(RmqConfig()),
                JwtModule.registerAsync(JwtConfig()),
                DatabaseModule,
            ],
            providers: [
                ConfigService,
                ContractsValidationService,
                PasswordService,
                UUIDService,
                AuthService,
                TokenService,
                AuthUserService,
                TokenRepository,
            ],
            controllers: [AuthController],
        }).compile();

        app = module.createNestApplication();
        controller = app.get<AuthController>(AuthController);
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
    it(`[ heathCheck ]`, async () => {
        await rmqService
            .send<
                InternalAuthHealthCheckQueryContract.Request,
                InternalAuthHealthCheckQueryContract.Response
            >(InternalAuthHealthCheckQueryContract.topic, {
                ping: true,
            })
            .then((res) => {
                expect(res.pong).toEqual(true);
            });
    });
    it(`[ User heathCheck ] - success`, async () => {
        await rmqService
            .send<
                InternalUserHealthCheckQueryContract.Request,
                InternalUserHealthCheckQueryContract.Response
            >(InternalUserHealthCheckQueryContract.topic, {
                ping: true,
            })
            .then((res) => {
                console.log(res);
                expect(res.pong).toEqual(true);
            });
    });

    /** ******************************************************************* **/
});

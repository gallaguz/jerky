import { ContractsValidationService, UUIDService } from '@jerky/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RMQModule } from 'nestjs-rmq';

import { JwtConfig, RmqConfig } from '../config';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth/auth-controller';
import { AuthService } from './auth/auth-service';
import { AuthUserService } from './auth/auth-user.service';
import { PasswordService } from './auth/password-service';
import { TokenRepository } from './auth/token-repository';
import { TokenService } from './auth/token-service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RMQModule.forRootAsync(RmqConfig()),
        JwtModule.registerAsync(JwtConfig()),
        DatabaseModule,
    ],
    controllers: [AuthController],
    providers: [
        JwtService,
        ContractsValidationService,
        PasswordService,
        UUIDService,
        AuthService,
        TokenService,
        AuthUserService,
        TokenRepository,
    ],
})
export class AuthApp {}

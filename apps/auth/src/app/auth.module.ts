import { Logger, Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { RMQModule } from 'nestjs-rmq';
import { RMQConfig } from '../config/rmq.config';
import { ENVConfig } from '../config/env.config';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '../config/JWTConfig';
import { UserService } from './user/user.service';
import { TokenRepository } from './token/token.repository';
import { UUIDService } from './common/uuid.service';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        JwtModule.registerAsync(JWTConfig()),
        DatabaseModule,
    ],
    controllers: [AuthController],
    providers: [
        UUIDService,
        AuthService,
        TokenService,
        UserService,
        TokenRepository,
        Logger,
    ],
})
export class AuthModule {}

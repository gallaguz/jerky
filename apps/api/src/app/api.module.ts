import { Module } from '@nestjs/common';

import { RMQConfig, ENVConfig, JWTConfig } from '../configs';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

import { ApiUserModule } from './api.user/api.user.module';
import { ApiAuthModule } from './api.auth/api.auth.module';
import { UUUIDService } from './common/uuid.service';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from '../configs/winston.config';
import { JwtModule } from '@nestjs/jwt';
import { ApiCatalogModule } from './api.catalog/api.catalog.module';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        JwtModule.registerAsync(JWTConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        WinstonModule.forRootAsync(WinstonConfig('API')),
        ApiUserModule,
        ApiAuthModule,
        ApiCatalogModule,
    ],
    providers: [UUUIDService],
})
export class ApiModule {}

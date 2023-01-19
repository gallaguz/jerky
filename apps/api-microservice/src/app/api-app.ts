import { JwtValidatorService, UUIDService } from '@jerky/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RMQModule } from 'nestjs-rmq';

import { JwtConfig, RmqConfig } from '../configs';
import { ApiAuthModule } from './api/auth-api/api-auth-module';
import { ApiCatalogModule } from './api/catalog-api/api.catalog.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RMQModule.forRootAsync(RmqConfig()),
        JwtModule.registerAsync(JwtConfig()),
        // WinstonModule.forRootAsync(WinstonConfig('API')),
        ApiAuthModule,
        ApiCatalogModule,
    ],
    providers: [UUIDService, JwtValidatorService],
})
export class ApiApp {}

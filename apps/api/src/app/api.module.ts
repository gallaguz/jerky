import { Module } from '@nestjs/common';

import { RMQConfig, ENVConfig } from '../configs';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

import { ApiUserModule } from './api.user/api.user.module';
import { ApiAuthModule } from './api.auth/api.auth.module';
import { UUUIDService } from './common/uuid.service';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        ApiUserModule,
        ApiAuthModule,
    ],
    providers: [UUUIDService],
})
export class ApiModule {}

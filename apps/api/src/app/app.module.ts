import { Module } from '@nestjs/common';

import { RMQConfig, ENVConfig } from '../configs';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        UserModule,
    ],
})
export class AppModule {}

import { ContractsValidationService } from '@jerky/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';

import { RmqConfig } from '../configs';
import { DatabaseModule } from '../database/database-module';
import { UserController } from './user/user-controller';
import { UserEventService } from './user/user-event-service';
import { UserRepository } from './user/user-repository';
import { UserService } from './user/user-service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RMQModule.forRootAsync(RmqConfig()),
        DatabaseModule,
    ],
    controllers: [UserController],
    providers: [
        ContractsValidationService,
        UserService,
        ConfigService,
        UserRepository,
        UserEventService,
    ],
})
export class UserApp {}

import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../configs/env.config';
import { RMQModule } from 'nestjs-rmq';
import { RMQConfig } from '../configs/rmq.config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserCommandsController } from './commands/user.commands.controller';
import { UserQueriesController } from './queries/user.queries.controller';
import { UserEventsController } from './events/user.events.controller';
import { UserEventEmitter } from './event.emitters/user.event.emitter';
import { UserQueriesService } from './queries/user.queries.service';
import { UserEventsService } from './events/user.events.service';
import { UserCommandsService } from './commands/user.commands.service';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [
        ConfigModule.forRoot(ENVConfig()),
        RMQModule.forRootAsync(RMQConfig()),
        DatabaseModule,
    ],
    controllers: [
        UserCommandsController,
        UserQueriesController,
        UserEventsController,
    ],
    providers: [
        UserEventEmitter,
        UserQueriesService,
        UserEventsService,
        UserCommandsService,
        UserRepository,
    ],
})
export class AppModule {}

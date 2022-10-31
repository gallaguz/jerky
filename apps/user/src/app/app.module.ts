import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../configs/env.config';
import { RMQModule } from 'nestjs-rmq';
import { RMQConfig } from '../configs/rmq.config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UserCommandsController } from './controllers/user.commands.controller';
import { UserQueriesController } from './controllers/user.queries.controller';
import { UserEventsController } from './controllers/user.events.controller';
import { UserEventEmitter } from './event.emitters/user.event.emitter';
import { UserQueriesService } from './services/user.queries.service';
import { UserEventsService } from './services/user.events.service';
import { UserCommandsService } from './services/user.commands.service';
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

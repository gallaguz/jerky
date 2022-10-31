import { Module } from '@nestjs/common';
import { UserCommandsController } from './controllers/user.commands.controller';
import { UserQueriesController } from './controllers/user.queries.controller';
import { UserCommandsService } from './services/user.commands.service';
import { UserQueriesService } from './services/user.queries.service';
import { UserEventsService } from './services/user.events.service';

@Module({
    controllers: [UserCommandsController, UserQueriesController],
    providers: [UserCommandsService, UserQueriesService, UserEventsService],
})
export class UserModule {}

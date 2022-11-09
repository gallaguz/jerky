import { Module } from '@nestjs/common';
import { ApiUserCommandsController } from './commands/api.user.commands.controller';
import { ApiUserQueriesController } from './queries/api.user.queries.controller';
import { ApiUserCommandsService } from './commands/api.user.commands.service';
import { ApiUserQueriesService } from './queries/api.user.queries.service';
import { ApiUserEventsService } from './events/api.user.events.service';
import { UUUIDService } from '../common/uuid.service';

@Module({
    controllers: [ApiUserCommandsController, ApiUserQueriesController],
    providers: [
        UUUIDService,
        ApiUserCommandsService,
        ApiUserQueriesService,
        ApiUserEventsService,
    ],
    exports: [
        ApiUserCommandsService,
        ApiUserQueriesService,
        ApiUserEventsService,
    ],
})
export class ApiUserModule {}

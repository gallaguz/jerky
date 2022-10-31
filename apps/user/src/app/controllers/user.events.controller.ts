import { Body, Controller, Logger } from '@nestjs/common';

import { RMQRoute } from 'nestjs-rmq';
import { IDomainEvent } from '@jerky/interfaces';
import { UserEventsService } from '../services/user.events.service';

@Controller('')
export class UserEventsController {
    constructor(private readonly userEventsService: UserEventsService) {}

    // TODO Move this route to alongside microservice with logging
    @RMQRoute('*.*.log')
    public async listener(@Body() event: IDomainEvent): Promise<void> {
        Logger.log(event);
    }
}

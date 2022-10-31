import { Body, Controller } from '@nestjs/common';

import {
    UserFindByUuid,
    UserFindByEmail,
    UserHealthCheck,
    UserFindFiltered,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserQueriesService } from '../services/user.queries.service';

@Controller('')
export class UserQueriesController {
    constructor(private readonly userQueriesService: UserQueriesService) {}

    @RMQRoute(UserHealthCheck.topic)
    public async healthCheck(): Promise<UserHealthCheck.Response> {
        return { pong: await this.userQueriesService.healthCheck() };
    }

    @RMQValidate()
    @RMQRoute(UserFindByUuid.topic)
    public async findOneByUuid(
        @Body() { uuid }: UserFindByUuid.Request,
    ): Promise<UserFindByUuid.Response> {
        return this.userQueriesService.findOneByUuid(uuid);
    }

    @RMQRoute(UserFindByEmail.topic)
    @RMQValidate()
    public async findOneByEmail(
        @Body() dto: UserFindByEmail.Request,
    ): Promise<UserFindByEmail.Response> {
        return this.userQueriesService.findOneByEmail(dto.email);
    }

    @RMQValidate()
    @RMQRoute(UserFindFiltered.topic)
    public async findFiltered(
        @Body() dto: UserFindFiltered.Request,
    ): Promise<UserFindFiltered.Response> {
        return this.userQueriesService.findFiltered(dto);
    }
}

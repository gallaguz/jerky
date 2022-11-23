import { Body, Controller, Logger } from '@nestjs/common';

import {
    UserFindByUuid,
    UserFindByEmail,
    UserHealthCheck,
    UserFindFiltered,
    UserValidate,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserQueriesService } from './user.queries.service';

@Controller('')
export class UserQueriesController {
    constructor(private readonly userQueriesService: UserQueriesService) {}

    @RMQRoute(UserHealthCheck.topic)
    public async healthCheck(): Promise<UserHealthCheck.Response> {
        return { pong: await this.userQueriesService.healthCheck() };
    }

    @RMQValidate()
    @RMQRoute(UserValidate.topic, {})
    public async validate(
        @Body() { email, password }: UserValidate.Request,
    ): Promise<UserValidate.Response> {
        return await this.userQueriesService.validate({ email, password });
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
        @Body() { email }: UserFindByEmail.Request,
    ): Promise<UserFindByEmail.Response> {
        return await this.userQueriesService.findOneByEmail(email);
    }

    @RMQValidate()
    @RMQRoute(UserFindFiltered.topic)
    public async findFiltered(
        @Body() { searchString, skip, take, orderBy }: UserFindFiltered.Request,
    ): Promise<UserFindFiltered.Response> {
        return this.userQueriesService.findFiltered({
            searchString,
            skip,
            take,
            orderBy,
        });
    }
}

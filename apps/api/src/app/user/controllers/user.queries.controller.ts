import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserQueriesService } from '../services/user.queries.service';
import {
    UserFindByEmail,
    UserFindByUuid,
    UserFindFiltered,
    UserHealthCheck,
} from '@jerky/contracts';

@Controller('v1/user')
export class UserQueriesController {
    constructor(private readonly userQueriesService: UserQueriesService) {}

    @Get('healthCheck')
    public async healthCheck(): Promise<UserHealthCheck.Response | undefined> {
        return this.userQueriesService.healthCheck();
    }

    @Get(':uuid')
    public async findOneByUuid(
        @Param() dto: UserFindByUuid.Request,
    ): Promise<UserFindByUuid.Response | undefined> {
        return this.userQueriesService.findOneByUuid(dto);
    }

    @Post('email')
    public async findOneByEmail(
        @Body() dto: UserFindByEmail.Request,
    ): Promise<UserFindByEmail.Response | undefined> {
        return this.userQueriesService.findOneByEmail(dto);
    }

    @Post('find')
    public async findFiltered(
        @Body() dto: UserFindFiltered.Request,
    ): Promise<UserFindFiltered.Response | undefined> {
        return this.userQueriesService.findManyFiltered(dto);
    }
}

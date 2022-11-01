import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

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

    @HttpCode(200)
    @Get('healthCheck')
    public async healthCheck(): Promise<UserHealthCheck.Response> {
        return this.userQueriesService.healthCheck();
    }

    @HttpCode(200)
    @Get(':uuid')
    public async findOneByUuid(
        @Param() dto: UserFindByUuid.Request,
    ): Promise<UserFindByUuid.Response | undefined> {
        return await this.userQueriesService.findOneByUuid(dto);
    }

    @HttpCode(200)
    @Post('email')
    public async findOneByEmail(
        @Body() dto: UserFindByEmail.Request,
    ): Promise<UserFindByEmail.Response> {
        return this.userQueriesService.findOneByEmail(dto);
    }

    @HttpCode(200)
    @Post('find')
    public async findFiltered(
        @Body() dto: UserFindFiltered.Request,
    ): Promise<UserFindFiltered.Response> {
        return this.userQueriesService.findManyFiltered(dto);
    }
}

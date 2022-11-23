import { Body, Controller, Param } from '@nestjs/common';

import { UserCreate, UserRemove, UserUpdate } from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserCommandsService } from './user.commands.service';

@Controller('')
export class UserCommandsController {
    constructor(private readonly userCommandsService: UserCommandsService) {}

    @RMQValidate()
    @RMQRoute(UserCreate.topic)
    public async create(
        @Body() user: UserCreate.Request,
    ): Promise<UserCreate.Response> {
        return await this.userCommandsService.create(user);
    }

    @RMQValidate()
    @RMQRoute(UserRemove.topic)
    public async delete(
        @Param('uuid') { uuid }: UserRemove.Request,
    ): Promise<UserRemove.Response> {
        return this.userCommandsService.delete(uuid);
    }

    @RMQValidate()
    @RMQRoute(UserUpdate.topic)
    public async update(
        @Body() props: UserUpdate.Request,
    ): Promise<UserUpdate.Response> {
        return this.userCommandsService.update(props);
    }
}

import { Body, Controller, Param } from '@nestjs/common';

import {
    UserCreate,
    UserDelete,
    UserUpdatePassword,
    UserUpdateEmail,
    UserUpdateRole,
} from '@jerky/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserCommandsService } from '../services/user.commands.service';

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
    @RMQRoute(UserDelete.topic)
    public async delete(
        @Param('uuid') { uuid }: UserDelete.Request,
    ): Promise<UserDelete.Response> {
        return this.userCommandsService.delete(uuid);
    }

    @RMQValidate()
    @RMQRoute(UserUpdatePassword.topic)
    public async updatePassword(
        @Body() user: UserUpdatePassword.Request,
    ): Promise<UserUpdatePassword.Response> {
        return this.userCommandsService.updatePassword(user);
    }

    @RMQValidate()
    @RMQRoute(UserUpdateEmail.topic)
    public async updateEmail(
        @Body() user: UserUpdateEmail.Request,
    ): Promise<UserUpdateEmail.Response> {
        return this.userCommandsService.updateEmail(user);
    }

    @RMQValidate()
    @RMQRoute(UserUpdateRole.topic)
    public async updateRole(
        @Body() user: UserUpdateRole.Request,
    ): Promise<UserUpdateRole.Response> {
        return this.userCommandsService.updateRole(user);
    }
}

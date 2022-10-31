import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

import { UserEventsService } from '../services/user.events.service';
import { RMQService } from 'nestjs-rmq';
import { UserCommandsService } from '../services/user.commands.service';
import {
    UserCreate,
    UserDelete,
    UserUpdateEmail,
    UserUpdatePasswordHash,
    UserUpdateRole,
} from '@jerky/contracts';

@Controller('v1/user')
export class UserCommandsController {
    constructor(
        private readonly userService: UserEventsService,
        private readonly rmqService: RMQService,
        private readonly userCommandsService: UserCommandsService,
    ) {}

    @Post()
    public async create(
        @Body() { email, passwordHash, role }: UserCreate.Request,
    ): Promise<UserCreate.Response> {
        return await this.userCommandsService.create({
            email,
            passwordHash,
            role,
        });
    }

    @Delete(':uuid')
    public async delete(
        @Param('uuid') { uuid }: UserDelete.Request,
    ): Promise<UserDelete.Response> {
        return await this.userCommandsService.delete(uuid);
    }

    @Patch('password')
    public async updatePasswordHash(
        @Body() { uuid, passwordHash }: UserUpdatePasswordHash.Request,
    ): Promise<UserUpdatePasswordHash.Response> {
        return this.userCommandsService.updatePasswordHash({
            uuid,
            passwordHash,
        });
    }

    @Patch('email')
    public async updatePasswordEmail(
        @Body() { uuid, email }: UserUpdateEmail.Request,
    ): Promise<UserUpdateEmail.Response> {
        return this.userCommandsService.updateEmail({ uuid, email });
    }

    @Patch('role')
    public async updatePasswordRole(
        @Body() { uuid, role }: UserUpdateRole.Request,
    ): Promise<UserUpdateRole.Response> {
        return this.userCommandsService.updateRole({ uuid, role });
    }
}

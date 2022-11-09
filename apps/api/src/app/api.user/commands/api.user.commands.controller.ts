import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { RMQService } from 'nestjs-rmq';
import { ApiUserCommandsService } from './api.user.commands.service';
import {
    UserCreate,
    UserDelete,
    UserUpdateEmail,
    UserUpdatePassword,
    UserUpdateRole,
} from '@jerky/contracts';

@Controller('v1/user')
export class ApiUserCommandsController {
    constructor(
        private readonly rmqService: RMQService,
        private readonly userCommandsService: ApiUserCommandsService,
    ) {}

    @UsePipes(new ValidationPipe())
    @Post()
    public async create(
        @Body() { email, password, role }: UserCreate.Request,
    ): Promise<UserCreate.Response> {
        return await this.userCommandsService.create({
            email,
            password,
            role,
        });
    }

    @UsePipes(new ValidationPipe())
    @Delete(':uuid')
    public async delete(
        @Param() { uuid }: UserDelete.Request,
    ): Promise<UserDelete.Response> {
        return await this.userCommandsService.delete(uuid);
    }

    @UsePipes(new ValidationPipe())
    @Patch('password')
    public async updatePasswordHash(
        @Body() { uuid, password }: UserUpdatePassword.Request,
    ): Promise<UserUpdatePassword.Response> {
        return this.userCommandsService.updatePassword({
            uuid,
            password,
        });
    }

    @UsePipes(new ValidationPipe())
    @Patch('email')
    public async updatePasswordEmail(
        @Body() { uuid, email }: UserUpdateEmail.Request,
    ): Promise<UserUpdateEmail.Response> {
        return this.userCommandsService.updateEmail({ uuid, email });
    }

    @UsePipes(new ValidationPipe())
    @Patch('role')
    public async updatePasswordRole(
        @Body() { uuid, role }: UserUpdateRole.Request,
    ): Promise<UserUpdateRole.Response> {
        return this.userCommandsService.updateRole({ uuid, role });
    }
}

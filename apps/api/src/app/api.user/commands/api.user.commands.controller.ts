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

import { ApiUserCommandsService } from './api.user.commands.service';
import { UserCreate, UserRemove, UserUpdate } from '@jerky/contracts';

@Controller('user')
export class ApiUserCommandsController {
    constructor(private readonly userCommandsService: ApiUserCommandsService) {}

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
    public async remove(
        @Param() { uuid }: UserRemove.Request,
    ): Promise<UserRemove.Response> {
        return await this.userCommandsService.remove(uuid);
    }

    @UsePipes(new ValidationPipe())
    @Patch()
    public async update(
        @Body() dto: UserUpdate.Request,
    ): Promise<UserUpdate.Response> {
        return this.userCommandsService.update(dto);
    }
}

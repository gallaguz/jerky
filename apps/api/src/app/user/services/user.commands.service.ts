import { Injectable } from '@nestjs/common';
import {
    UserCreate,
    UserDelete,
    UserUpdateEmail,
    UserUpdatePasswordHash,
    UserUpdateRole,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { UserServiceBase } from '../common/user.service.base';

@Injectable()
export class UserCommandsService extends UserServiceBase {
    constructor(private readonly rmqService: RMQService) {
        super();
    }

    public async create(dto: UserCreate.Request): Promise<UserCreate.Response> {
        return await this.rmqService.send<
            UserCreate.Request,
            UserCreate.Response
        >(UserCreate.topic, dto, {
            headers: {
                requestId: this.generateUUID(),
            },
        });
    }

    public async delete(uuid: string): Promise<UserDelete.Response> {
        return await this.rmqService.send<
            UserDelete.Request,
            UserDelete.Response
        >(
            UserDelete.topic,
            { uuid },
            {
                headers: {
                    requestId: this.generateUUID(),
                },
            },
        );
    }

    public async updatePasswordHash({
        uuid,
        passwordHash,
    }: UserUpdatePasswordHash.Request): Promise<UserUpdatePasswordHash.Response> {
        return await this.rmqService.send<
            UserUpdatePasswordHash.Request,
            UserUpdatePasswordHash.Response
        >(
            UserUpdatePasswordHash.topic,
            { uuid, passwordHash },
            {
                headers: {
                    requestId: this.generateUUID(),
                },
            },
        );
    }

    public async updateEmail({
        uuid,
        email,
    }: UserUpdateEmail.Request): Promise<UserUpdateEmail.Response> {
        return await this.rmqService.send<
            UserUpdateEmail.Request,
            UserUpdateEmail.Response
        >(
            UserUpdateEmail.topic,
            { uuid, email },
            {
                headers: {
                    requestId: this.generateUUID(),
                },
            },
        );
    }

    public async updateRole({
        uuid,
        role,
    }: UserUpdateRole.Request): Promise<UserUpdateRole.Response> {
        return await this.rmqService.send<
            UserUpdateRole.Request,
            UserUpdateRole.Response
        >(
            UserUpdateRole.topic,
            { uuid, role },
            {
                headers: {
                    requestId: this.generateUUID(),
                },
            },
        );
    }
}

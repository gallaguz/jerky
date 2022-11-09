import { BadRequestException, Injectable } from '@nestjs/common';
import {
    UserCreate,
    UserDelete,
    UserUpdateEmail,
    UserUpdatePassword,
    UserUpdateRole,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { SOMETHING_WENT_WRONG } from '@jerky/constants';
import { UUUIDService } from '../../common/uuid.service';

@Injectable()
export class ApiUserCommandsService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUUIDService,
    ) {}

    public async create(dto: UserCreate.Request): Promise<UserCreate.Response> {
        try {
            return await this.rmqService.send<
                UserCreate.Request,
                UserCreate.Response
            >(UserCreate.topic, dto, {
                headers: {
                    requestId: this.uuidService.getUuid(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }

    public async delete(uuid: string): Promise<UserDelete.Response> {
        try {
            return await this.rmqService.send<
                UserDelete.Request,
                UserDelete.Response
            >(
                UserDelete.topic,
                { uuid },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }

    public async updatePassword({
        uuid,
        password,
    }: UserUpdatePassword.Request): Promise<UserUpdatePassword.Response> {
        try {
            return await this.rmqService.send<
                UserUpdatePassword.Request,
                UserUpdatePassword.Response
            >(
                UserUpdatePassword.topic,
                { uuid, password },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }

    public async updateEmail({
        uuid,
        email,
    }: UserUpdateEmail.Request): Promise<UserUpdateEmail.Response> {
        try {
            return await this.rmqService.send<
                UserUpdateEmail.Request,
                UserUpdateEmail.Response
            >(
                UserUpdateEmail.topic,
                { uuid, email },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }

    public async updateRole({
        uuid,
        role,
    }: UserUpdateRole.Request): Promise<UserUpdateRole.Response> {
        try {
            return await this.rmqService.send<
                UserUpdateRole.Request,
                UserUpdateRole.Response
            >(
                UserUpdateRole.topic,
                { uuid, role },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }
}

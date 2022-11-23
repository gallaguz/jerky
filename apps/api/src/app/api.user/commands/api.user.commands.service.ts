import { BadRequestException, Injectable } from '@nestjs/common';
import {
    UserCreate,
    UserRemove,
    UserRemoveEvent,
    UserUpdate,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { UUUIDService } from '../../common/uuid.service';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;

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

    public async remove(uuid: string): Promise<UserRemove.Response> {
        try {
            return await this.rmqService.send<
                UserRemove.Request,
                UserRemove.Response
            >(
                UserRemoveEvent.topic,
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

    public async update(
        props: UserUpdate.Request,
    ): Promise<UserUpdate.Response> {
        try {
            return await this.rmqService.send<
                UserUpdate.Request,
                UserUpdate.Response
            >(UserUpdate.topic, props, {
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
}

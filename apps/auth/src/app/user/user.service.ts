import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IUser } from '@jerky/interfaces';
import {
    UserCreate,
    UserFindByEmail,
    UserFindByUuid,
    UserValidate,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { UUUIDService } from '../common/uuid.service';

@Injectable()
export class UserService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly logger: Logger,
        private readonly uuidService: UUUIDService,
    ) {
        this.logger = new Logger(UserService.name);
    }

    public async validateUserPassword(
        email: string,
        password: string,
    ): Promise<IUser> {
        try {
            return await this.rmqService.send<
                UserValidate.Request,
                UserValidate.Response
            >(
                UserValidate.topic,
                { email, password },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);

                throw new UnauthorizedException(e.message);
            }
            throw new UnauthorizedException();
        }
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            return await this.rmqService.send<
                UserFindByEmail.Request,
                UserFindByEmail.Response
            >(
                UserFindByEmail.topic,
                { email },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            return null;
        }
    }

    public async getUserByUuid(uuid: string): Promise<IUser | null> {
        try {
            return await this.rmqService.send<
                UserFindByUuid.Request,
                UserFindByUuid.Response
            >(
                UserFindByUuid.topic,
                { uuid },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            return null;
        }
    }

    public async createUser(
        email: string,
        password: string,
    ): Promise<IUser | null> {
        try {
            return await this.rmqService.send<
                UserCreate.Request,
                UserCreate.Response
            >(
                UserCreate.topic,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e.message);
            }
            return null;
        }
    }
}

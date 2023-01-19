import { UUIDService } from '@jerky/common';
import {
    InternalUserCreateCommandContract,
    InternalUserFindOneQueryContract,
    MicroserviceConnectContract,
} from '@jerky/contracts';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class AuthUserService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUIDService,
    ) {}

    public async healthCheck(): Promise<boolean> {
        return this.rmqService.healthCheck();
    }

    public async findOne(
        props: InternalUserFindOneQueryContract.Request,
    ): Promise<InternalUserFindOneQueryContract.Response | null> {
        try {
            return await this.rmqService.send<
                InternalUserFindOneQueryContract.Request,
                InternalUserFindOneQueryContract.Response
            >(InternalUserFindOneQueryContract.topic, props, {
                headers: {
                    requestId: this.uuidService.getUuid(),
                },
            });
        } catch (_) {
            return null;
        }
    }

    public async create(
        props: InternalUserCreateCommandContract.Request,
    ): Promise<InternalUserCreateCommandContract.Response> {
        return await this.rmqService.send<
            InternalUserCreateCommandContract.Request,
            InternalUserCreateCommandContract.Response
        >(InternalUserCreateCommandContract.topic, props, {
            headers: {
                requestId: this.uuidService.getUuid(),
            },
        });
    }

    public async test(): Promise<MicroserviceConnectContract.Response> {
        return await this.rmqService.send<
            MicroserviceConnectContract.Request,
            MicroserviceConnectContract.Response
        >(
            MicroserviceConnectContract.topic,
            { ping: false },
            {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            },
        );
    }
}

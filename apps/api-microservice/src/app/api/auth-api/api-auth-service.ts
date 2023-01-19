import { UUIDService } from '@jerky/common';
import {
    InternalAuthLoginCommandContract,
    InternalAuthLogoutCommandContract,
    InternalAuthRefreshCommandContract,
    InternalAuthRegisterCommandContract,
    InternalUserRemoveCommandContract,
} from '@jerky/contracts';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class ApiAuthService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUIDService,
    ) {}

    public async register(
        props: InternalAuthRegisterCommandContract.Request,
    ): Promise<InternalAuthRegisterCommandContract.Response> {
        return await this.rmqService.send<
            InternalAuthRegisterCommandContract.Request,
            InternalAuthRegisterCommandContract.Response
        >(InternalAuthRegisterCommandContract.topic, props, {
            headers: {
                requestId: this.uuidService.getUuid(),
            },
        });
    }

    public async login(
        props: InternalAuthLoginCommandContract.Request,
    ): Promise<InternalAuthLoginCommandContract.Response> {
        return await this.rmqService.send<
            InternalAuthLoginCommandContract.Request,
            InternalAuthLoginCommandContract.Response
        >(InternalAuthLoginCommandContract.topic, props, {
            headers: {
                requestId: this.uuidService.getUuid(),
            },
        });
    }

    public async logout({
        refreshToken,
    }: InternalAuthLogoutCommandContract.Request): Promise<InternalAuthLogoutCommandContract.Response> {
        return await this.rmqService.send<
            InternalAuthLogoutCommandContract.Request,
            InternalAuthLogoutCommandContract.Response
        >(
            InternalAuthLogoutCommandContract.topic,
            { refreshToken },
            {
                headers: {
                    requestId: this.uuidService.getUuid(),
                },
            },
        );
    }

    public async refresh({
        refreshToken,
    }: InternalAuthRefreshCommandContract.Request): Promise<InternalAuthRefreshCommandContract.Response> {
        return await this.rmqService.send<
            InternalAuthRefreshCommandContract.Request,
            InternalAuthRefreshCommandContract.Response
        >(
            InternalAuthRefreshCommandContract.topic,
            { refreshToken },
            {
                headers: {
                    requestId: this.uuidService.getUuid(),
                },
            },
        );
    }

    public async remove(
        props: InternalUserRemoveCommandContract.Request,
    ): Promise<InternalUserRemoveCommandContract.Response> {
        return await this.rmqService.send<
            InternalUserRemoveCommandContract.Request,
            InternalUserRemoveCommandContract.Response
        >(InternalUserRemoveCommandContract.topic, props, {
            headers: {
                requestId: this.uuidService.getUuid(),
            },
        });
    }
}

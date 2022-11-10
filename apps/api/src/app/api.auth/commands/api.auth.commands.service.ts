import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import {
    AuthLogin,
    AuthLogout,
    AuthRefresh,
    AuthRegister,
} from '@jerky/contracts';
import { UUUIDService } from '../../common/uuid.service';

@Injectable()
export class ApiAuthCommandsService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUUIDService,
    ) {}

    public async register({
        email,
        password,
    }: AuthRegister.Request): Promise<AuthRegister.Response> {
        try {
            return await this.rmqService.send<
                AuthRegister.Request,
                AuthRegister.Response
            >(
                AuthRegister.topic,
                { email, password },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message);
            }
            throw new UnauthorizedException();
        }
    }

    public async login({
        email,
        password,
    }: AuthLogin.Request): Promise<AuthLogin.Response> {
        try {
            return await this.rmqService.send<
                AuthLogin.Request,
                AuthLogin.Response
            >(
                AuthLogin.topic,
                { email, password },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message);
            }
            throw new UnauthorizedException();
        }
    }

    public async logout({
        refreshToken,
    }: AuthLogout.Request): Promise<AuthLogout.Response> {
        try {
            return await this.rmqService.send<
                AuthLogout.Request,
                AuthLogout.Response
            >(
                AuthLogout.topic,
                { refreshToken },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message);
            }
            throw new UnauthorizedException();
        }
    }

    public async refresh({
        refreshToken,
    }: AuthRefresh.Request): Promise<AuthRefresh.Response> {
        try {
            return await this.rmqService.send<
                AuthRefresh.Request,
                AuthRefresh.Response
            >(
                AuthRefresh.topic,
                { refreshToken },
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message);
            }
            throw new UnauthorizedException();
        }
    }
}

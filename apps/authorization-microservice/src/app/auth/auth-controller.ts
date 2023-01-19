import { ContractsValidationService } from '@jerky/common';
import {
    InternalAuthHealthCheckQueryContract,
    InternalAuthLoginCommandContract,
    InternalAuthLogoutCommandContract,
    InternalAuthRefreshCommandContract,
    InternalAuthRegisterCommandContract,
} from '@jerky/contracts';
import { Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';

import { AuthService } from './auth-service';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalAuthHealthCheckQueryContract.topic)
    public async healthCheck(): Promise<InternalAuthHealthCheckQueryContract.Response> {
        return { pong: await this.authService.healthCheck() };
    }
    @RMQRoute(InternalAuthRegisterCommandContract.topic)
    public async register(
        props: InternalAuthRegisterCommandContract.Request,
    ): Promise<InternalAuthRegisterCommandContract.Response> {
        const validated: InternalAuthRegisterCommandContract.Request =
            await this.validationService.validateContract(
                InternalAuthRegisterCommandContract.Request,
                props,
            );
        return await this.authService.register(validated);
    }

    @RMQRoute(InternalAuthLoginCommandContract.topic)
    public async login(
        props: InternalAuthLoginCommandContract.Request,
    ): Promise<InternalAuthLoginCommandContract.Response> {
        const validated: InternalAuthLoginCommandContract.Request =
            await this.validationService.validateContract(
                InternalAuthLoginCommandContract.Request,
                props,
            );
        return await this.authService.login(validated);
    }
    @RMQRoute(InternalAuthLogoutCommandContract.topic)
    public async logout(
        props: InternalAuthLogoutCommandContract.Request,
    ): Promise<InternalAuthLogoutCommandContract.Response> {
        const validated: InternalAuthLogoutCommandContract.Request =
            await this.validationService.validateContract(
                InternalAuthLogoutCommandContract.Request,
                props,
            );
        return this.authService.logout(validated);
    }

    @RMQRoute(InternalAuthRefreshCommandContract.topic)
    public async refresh(
        props: InternalAuthRefreshCommandContract.Request,
    ): Promise<InternalAuthRefreshCommandContract.Response> {
        const validated: InternalAuthRefreshCommandContract.Request =
            await this.validationService.validateContract(
                InternalAuthRefreshCommandContract.Request,
                props,
            );
        return await this.authService.refresh(validated);
    }
}

import {
    Body,
    Controller,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    AuthLogin,
    AuthLogout,
    AuthRefresh,
    AuthRegister,
} from '@jerky/contracts';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(AuthController.name);
    }

    @RMQRoute(AuthRegister.topic)
    @RMQValidate()
    public async register(
        @Body() { email, password }: AuthRegister.Request,
    ): Promise<AuthRegister.Response> {
        // try {
        return await this.authService.register({ email, password });
        // } catch (e) {
        //     if (e instanceof Error) {
        //         this.logger.verbose(e);
        //         throw new UnauthorizedException(e.message);
        //     }
        //     throw new UnauthorizedException();
        // }
    }

    @RMQRoute(AuthLogin.topic)
    @RMQValidate()
    public async login(
        @Body() { email, password }: AuthLogin.Request,
        @RMQMessage msg: Message,
    ): Promise<AuthLogin.Response> {
        // const requestId = msg.properties.headers['requestId'];
        // this.logger.log(`requestId: ${requestId} ${new Date().getTime()}`);
        // this.logger.log(`payload: ${email} ${password}`);

        // try {
        return await this.authService.login({ email, password });
        // } catch (e) {
        //     if (e instanceof Error) {
        //         this.logger.error(e.message);
        //         throw new UnauthorizedException(e.message);
        //     }
        // }
        // throw new UnauthorizedException();
    }

    @RMQRoute(AuthLogout.topic)
    @RMQValidate()
    public async logout(
        @Body() { refreshToken }: AuthLogout.Request,
    ): Promise<AuthLogout.Response> {
        return this.authService.logout({ refreshToken });
    }

    @RMQRoute(AuthRefresh.topic)
    @RMQValidate()
    public async refresh(
        @Body() { refreshToken }: AuthRefresh.Request,
    ): Promise<AuthRefresh.Response> {
        try {
            return await this.authService.refresh(refreshToken);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(e);
            }

            throw new UnauthorizedException('1');
        }
    }
}

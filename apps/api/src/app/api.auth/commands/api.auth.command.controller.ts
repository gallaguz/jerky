import {
    Body,
    Controller,
    Get,
    HttpCode,
    Inject,
    Post,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiAuthCommandsService } from './api.auth.commands.service';

import { JwtGuard } from '../../core/guards/jwt.guard';
import { Cookies } from '../../core/decorators/cookies.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
    HttpLogin,
    HttpLogout,
    HttpRefresh,
    HttpRegister,
} from '@jerky/contracts';

@Controller('auth')
export class ApiAuthCommandController {
    constructor(
        private readonly authCommandsService: ApiAuthCommandsService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // private readonly logger: Logger,
    ) {
        this.logger.verbose('verbose', {
            controller: ApiAuthCommandController.name,
        });
    }

    // @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(201)
    @Post('register')
    public async register(
        @Res({ passthrough: true }) response: Response,
        @Body() { email, password }: HttpRegister.Request,
    ): Promise<HttpRegister.Response> {
        const { accessToken, refreshToken } =
            await this.authCommandsService.register({
                email,
                password,
            });

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });

        return { accessToken };
    }

    // @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(200)
    @Post('login')
    public async login(
        // @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
        @Body() { email, password }: HttpLogin.Request,
    ): Promise<HttpLogin.Response> {
        const { accessToken, refreshToken } =
            await this.authCommandsService.login({
                email,
                password,
            });

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });

        return { accessToken };
    }

    // @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(200)
    @UseGuards(new JwtGuard())
    @Get('refresh')
    public async refresh(
        @Cookies('refreshToken') refreshToken: string,
        // @JWTPayload() user: ITokenPayload,
        // @Req() request: Request,
        // @Res({ passthrough: true }) response: Response,
    ): Promise<HttpRefresh.Response> {
        if (!refreshToken) throw new UnauthorizedException();

        const { accessToken } = await this.authCommandsService.refresh({
            refreshToken,
        });

        return { accessToken };
    }

    // @UseInterceptors(UnsetAuthCookiesInterceptor)
    @HttpCode(401)
    @UseGuards(new JwtGuard())
    @Get('logout')
    public async logout(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<HttpLogout.Response> {
        const res = await this.authCommandsService.logout({ refreshToken });

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() - 1),
            sameSite: 'strict',
            httpOnly: true,
        });

        return res;
    }
}

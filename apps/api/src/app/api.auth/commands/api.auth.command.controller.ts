import {
    Body,
    Controller,
    Get,
    HttpCode,
    Logger,
    Post,
    Res,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiAuthCommandsService } from './api.auth.commands.service';
import { ApiLogin, ApiLogout, ApiRefresh, ApiRegister } from '@jerky/contracts';
import { JwtGuard } from '../../system/guards/jwt.guard';
import { Cookies } from '../../system/decorators/cookies.decorator';
import { UnsetAuthCookiesInterceptor } from '../../system/interceptors/unset.auth.cookies.interceptor';

@Controller('v1/auth')
export class ApiAuthCommandController {
    constructor(
        private readonly authCommandsService: ApiAuthCommandsService,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(ApiAuthCommandController.name);
    }

    // @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(201)
    @Post('register')
    public async register(
        @Res({ passthrough: true }) response: Response,
        @Body() { email, password }: ApiRegister.Request,
    ): Promise<ApiRegister.Response> {
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
        @Body() { email, password }: ApiLogin.Request,
    ): Promise<ApiLogin.Response> {
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
    ): Promise<ApiRefresh.Response> {
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
    ): Promise<ApiLogout.Response> {
        const res = await this.authCommandsService.logout({ refreshToken });

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() - 1),
            sameSite: 'strict',
            httpOnly: true,
        });

        return res;
    }
}

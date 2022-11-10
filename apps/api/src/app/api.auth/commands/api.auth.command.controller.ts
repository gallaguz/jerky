import {
    Body,
    Controller,
    Get,
    HttpCode,
    Logger,
    Post,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiAuthCommandsService } from './api.auth.commands.service';
import {
    AuthLogin,
    AuthLogout,
    AuthRefresh,
    AuthRegister,
} from '@jerky/contracts';
import { JwtGuard } from '../../system/guards/jwt.guard';
import { Cookies } from '../../system/decorators/cookies.decorator';
import { SetAuthCookiesInterceptor } from '../../system/interceptors/set.auth.cookies.interceptor';
import { UnsetAuthCookiesInterceptor } from '../../system/interceptors/unset.auth.cookies.interceptor';

@Controller('v1/auth')
export class ApiAuthCommandController {
    constructor(
        private readonly authCommandsService: ApiAuthCommandsService,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(ApiAuthCommandController.name);
    }

    @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(201)
    @Post('register')
    public async register(
        // @Res({ passthrough: true }) response: Response,
        @Body() { email, password }: AuthRegister.Request,
    ): Promise<AuthRegister.Response> {
        return await this.authCommandsService.register({
            email,
            password,
        });
    }

    @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(200)
    @Post('login')
    public async login(
        // @Req() request: Request,
        // @Res({ passthrough: true }) response: Response,
        @Body() { email, password }: AuthLogin.Request,
    ): Promise<AuthLogin.Response> {
        const { accessToken, refreshToken } =
            await this.authCommandsService.login({
                email,
                password,
            });

        return { accessToken, refreshToken };
    }

    @UseInterceptors(SetAuthCookiesInterceptor)
    @HttpCode(200)
    @UseGuards(new JwtGuard())
    @Get('refresh')
    public async refresh(
        @Cookies('refreshToken') refreshToken: string,
        // @JWTPayload() user: ITokenPayload,
        // @Req() request: Request,
        // @Res({ passthrough: true }) response: Response,
    ): Promise<AuthRefresh.Response> {
        if (!refreshToken) throw new UnauthorizedException();

        return await this.authCommandsService.refresh({
            refreshToken,
        });
    }

    @UseInterceptors(UnsetAuthCookiesInterceptor)
    // @HttpCode(401)
    @UseGuards(new JwtGuard())
    @Get('logout')
    public async logout(
        @Cookies('refreshToken') refreshToken: string,
    ): Promise<AuthLogout.Response> {
        return this.authCommandsService.logout({ refreshToken });
    }
}

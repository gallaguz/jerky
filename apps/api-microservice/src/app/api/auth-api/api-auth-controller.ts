import { JwtValidatorService } from '@jerky/common';
import {
    ExternalAuthHealthCheckQueryContract,
    ExternalAuthLoginCommandContract,
    ExternalAuthLogoutCommandContract,
    ExternalAuthRefreshCommandContract,
    ExternalAuthRegisterCommandContract,
    ExternalUserRemoveCommandContract,
} from '@jerky/contracts';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Res,
    UnauthorizedException,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '@prisma/client/scripts/user-client';
import { Response } from 'express';

import { Cookies } from '../../decorators/cookies.decorator';
import { HasRoles } from '../../decorators/has-role-decorator';
import { JwtGuard } from '../../guards/jwt.guard';
import { RolesGuard } from '../../guards/roles-guard';
import { ApiAuthService } from './api-auth-service';

@Controller('auth')
export class ApiAuthController {
    constructor(
        private readonly apiAuthService: ApiAuthService,
        private readonly jwtValidatorService: JwtValidatorService,
    ) {}

    @UsePipes(
        new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
    )
    @HttpCode(201)
    @Post('register')
    public async register(
        @Res({ passthrough: true }) response: Response,
        @Body() props: ExternalAuthRegisterCommandContract.Request,
    ): Promise<ExternalAuthRegisterCommandContract.Response> {
        const { accessToken, refreshToken } =
            await this.apiAuthService.register(props);

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });

        return { accessToken };
    }

    @UsePipes(
        new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
    )
    @HttpCode(200)
    @Post('login')
    public async login(
        // @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
        @Body() props: ExternalAuthLoginCommandContract.Request,
    ): Promise<ExternalAuthLoginCommandContract.Response> {
        const tokens = await this.apiAuthService.login(props);

        if (!tokens) throw new BadRequestException();

        response.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });

        return { accessToken: tokens.accessToken };
    }
    @HttpCode(200)
    @Get('refresh')
    public async refresh(
        @Cookies('refreshToken') refreshToken: string,
    ): Promise<ExternalAuthRefreshCommandContract.Response> {
        const validated = await this.jwtValidatorService.validateRefreshToken(
            refreshToken,
        );
        if (!validated) throw new UnauthorizedException();

        return await this.apiAuthService.refresh({
            refreshToken,
        });
    }
    @HttpCode(401)
    @Get('logout')
    public async logout(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<ExternalAuthLogoutCommandContract.Response> {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        await this.apiAuthService.logout({ refreshToken });

        response.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() - 1),
            sameSite: 'strict',
            httpOnly: true,
        });

        return { logout: true };
    }

    @HasRoles(UserRole.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @UsePipes(
        new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
    )
    @Delete(':uuid')
    public async remove(
        @Cookies('refreshToken') refreshToken: string,
        @Param() props: ExternalUserRemoveCommandContract.Request,
    ): Promise<ExternalUserRemoveCommandContract.Response> {
        const validated = await this.jwtValidatorService.validateRefreshToken(
            refreshToken,
        );
        if (!validated) throw new UnauthorizedException();

        const removed = await this.apiAuthService.remove({
            where: { uuid: props.uuid },
        });

        return { uuid: removed.uuid };
    }

    @HttpCode(200)
    @Get('healthCheck')
    public async healthCheck(
        @Body() props: ExternalAuthHealthCheckQueryContract.Request,
    ): Promise<ExternalAuthHealthCheckQueryContract.Response> {
        return { pong: !props.ping };
    }

    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Get('healthCheckProtected')
    public async healthCheckProtected(
        @Body() props: ExternalAuthHealthCheckQueryContract.Request,
    ): Promise<ExternalAuthHealthCheckQueryContract.Response> {
        return { pong: !props.ping };
    }

    // @HasRoles(UserRole.ADMIN)
    // @UseGuards(JwtGuard, RolesGuard)
    // @UsePipes(
    //     new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
    // )
    // @Delete(':uuid')
    // public async test(
    //     @Cookies('refreshToken') refreshToken: string,
    //     @Param() props: ExternalUserRemoveCommandContract.Request,
    // ): Promise<ExternalUserRemoveCommandContract.Response> {
    //     const validated = await this.jwtValidatorService.validateRefreshToken(
    //         refreshToken,
    //     );
    //     if (!validated) throw new UnauthorizedException();
    //
    //     return await this.apiAuthService.remove({
    //         where: { uuid: props.uuid },
    //     });
    // }
}

import {
    InternalAuthLoginCommandContract,
    InternalAuthLogoutCommandContract,
    InternalAuthRefreshCommandContract,
    InternalAuthRegisterCommandContract,
} from '@jerky/contracts';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client/scripts/user-client';

import { AuthUserService } from './auth-user.service';
import { PasswordService } from './password-service';
import { TokenService } from './token-service';

@Injectable()
export class AuthService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
        private readonly userService: AuthUserService,
    ) {}

    public async healthCheck(): Promise<boolean> {
        return this.userService.healthCheck();
    }
    public async register({
        email,
        password,
        role,
    }: InternalAuthRegisterCommandContract.Request): Promise<InternalAuthRegisterCommandContract.Response> {
        const existedUser = await this.userService.findOne({
            where: { email },
        });
        if (existedUser) throw new ConflictException();

        const { salt, passwordHash } = await this.passwordService.hashPassword(
            password,
        );
        const newUser = await this.userService.create({
            data: { email, passwordHash, salt, role },
        });
        if (!newUser) throw new BadRequestException();
        const { uuid } = newUser;

        const tokens = await this.tokenService.generateTokens(uuid, role);
        if (!tokens) throw new BadRequestException();

        const { accessToken, refreshToken } = tokens;

        const savedRefreshToken = await this.tokenService.saveRefreshToken(
            refreshToken,
        );
        if (!savedRefreshToken) throw new BadRequestException();

        return { accessToken, refreshToken };
    }

    public async login(
        props: InternalAuthLoginCommandContract.Request,
    ): Promise<InternalAuthLoginCommandContract.Response> {
        const existed: User | null = await this.userService.findOne({
            where: { email: props.email },
        });
        if (!existed) throw new NotFoundException();

        const validated = await this.passwordService.validatePassword(
            props.password,
            existed.passwordHash,
        );
        if (!validated) throw new UnauthorizedException();

        const tokens = await this.tokenService.generateTokens(
            existed.uuid,
            existed.role,
        );

        await this.tokenService.saveRefreshToken(tokens.refreshToken);
        return tokens;
    }

    public async refresh(
        props: InternalAuthRefreshCommandContract.Request,
    ): Promise<InternalAuthRefreshCommandContract.Response> {
        const { uuid, role } = await this.tokenService.validateRefreshToken(
            props.refreshToken,
        );

        const existed = await this.tokenService.findRefreshToken(
            props.refreshToken,
        );

        if (!existed) throw new NotFoundException();

        await this.tokenService.deleteRefreshToken(props.refreshToken);

        const existedUser = await this.userService.findOne({ where: { uuid } });
        if (!existedUser) throw new NotFoundException();

        const accessToken = await this.tokenService.generateAccessToken(
            uuid,
            role,
        );

        return { accessToken };
    }

    public async logout({
        refreshToken,
    }: InternalAuthLogoutCommandContract.Request): Promise<InternalAuthLogoutCommandContract.Response> {
        const { uuid } = await this.tokenService.validateRefreshToken(
            refreshToken,
        );

        const existedUser = await this.userService.findOne({ where: { uuid } });
        if (!existedUser) throw new NotFoundException();

        await this.tokenService.deleteRefreshToken(refreshToken);

        return {};
    }
}

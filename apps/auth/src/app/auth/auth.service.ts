import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
    AuthLogin,
    AuthLogout,
    AuthRefresh,
    AuthRegister,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { ERROR_MESSAGES } from '@jerky/constants';
import USER = ERROR_MESSAGES.USER;

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: DatabaseService,
        private readonly rmqService: RMQService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(AuthService.name);
    }

    public async register({
        email,
        password,
    }: AuthRegister.Request): Promise<AuthRegister.Response> {
        const existedUser = await this.userService.getUserByEmail(email);
        if (existedUser) throw new Error(USER.USER_EXIST);

        const newUser = await this.userService.createUser(email, password);
        if (!newUser) throw new Error('Cant save user');

        const { uuid, role } = newUser;

        const tokens = await this.tokenService.generateTokens(uuid, role);
        if (!tokens) throw new Error('Cant generate tokens');

        const { accessToken, refreshToken } = tokens;

        const savedRefreshToken = await this.tokenService.saveRefreshToken(
            refreshToken,
        );
        if (!savedRefreshToken) throw new Error('Cant save refresh token');

        return { accessToken, refreshToken };
    }

    public async login({
        email,
        password,
    }: AuthLogin.Request): Promise<AuthLogin.Response> {
        const { uuid, role } = await this.userService.validateUserPassword(
            email,
            password,
        );

        const { accessToken, refreshToken } =
            await this.tokenService.generateTokens(uuid, role);

        await this.tokenService.saveRefreshToken(refreshToken);

        return { accessToken, refreshToken };
    }

    public async refresh(refreshToken: string): Promise<AuthRefresh.Response> {
        const { uuid, role } = await this.tokenService.validateRefreshToken(
            refreshToken,
        );

        const existedRefreshToken = await this.tokenService.findRefreshToken(
            refreshToken,
        );

        if (!existedRefreshToken) throw new NotFoundException();

        await this.tokenService.deleteRefreshToken(refreshToken);

        const existedUser = await this.userService.getUserByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const tokens = await this.tokenService.generateTokens(uuid, role);

        await this.tokenService.saveRefreshToken(tokens.refreshToken);
        return tokens;
    }

    public async logout({
        refreshToken,
    }: AuthLogout.Request): Promise<AuthLogout.Response> {
        const { uuid } = await this.tokenService.validateRefreshToken(
            refreshToken,
        );

        const existedUser = await this.userService.getUserByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        await this.tokenService.deleteRefreshToken(refreshToken);

        throw new UnauthorizedException();
    }
}

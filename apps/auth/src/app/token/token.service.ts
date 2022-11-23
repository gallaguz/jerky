import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenDecoded, ITokenPayload, ITokens } from '@jerky/interfaces';
import { ConfigService } from '@nestjs/config';
import { TokenRepository } from './token.repository';
import { Role } from '@prisma/client/scripts/user-client';
import { RefreshToken } from '@prisma/client/scripts/auth-client';
import { UUIDService } from '../common/uuid.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly tokenRepository: TokenRepository,
        private readonly logger: Logger,
        private readonly uuidService: UUIDService,
    ) {
        this.logger = new Logger(TokenService.name);
        this.logger.debug(`${TokenService.name} init`);
    }

    public async generateTokens(uuid: string, role: Role): Promise<ITokens> {
        return {
            accessToken: await this.generateAccessToken(uuid, role),
            refreshToken: await this.generateRefreshToken(uuid, role),
        };
    }

    public async generateAccessToken(
        uuid: string,
        role: Role,
    ): Promise<string> {
        return await this.jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
            secret: this.configService.get('JWT_SECRET_ACCESS'),
            expiresIn: Number(this.configService.get('JWT_ACCESS_EXP')),
            jwtid: this.uuidService.getUuid(),
        });
    }

    public async generateRefreshToken(
        uuid: string,
        role: Role,
    ): Promise<string> {
        return await this.jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
            secret: this.configService.get('JWT_SECRET_REFRESH'),
            expiresIn: Number(this.configService.get('JWT_REFRESH_EXP')),
            jwtid: this.uuidService.getUuid(),
        });
    }

    public async saveRefreshToken(refreshToken: string): Promise<string> {
        const decoded = await this.validateRefreshToken(refreshToken);
        if (!decoded) throw new BadRequestException('--- broken token');

        // const tokenUuid = this.generateUUID();

        try {
            return await this.tokenRepository.save(<RefreshToken>{
                uuid: decoded.jti,
                token: refreshToken,
                exp: decoded.exp,
                iat: decoded.iat,
                userUuid: decoded.uuid,
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
        }
        throw new BadRequestException('cant save token');
    }

    public async findRefreshToken(refreshToken: string): Promise<RefreshToken> {
        return <RefreshToken>await this.tokenRepository.find(refreshToken);
    }

    public async deleteRefreshToken(
        refreshToken: string,
    ): Promise<RefreshToken> {
        return <RefreshToken>await this.tokenRepository.delete(refreshToken);
    }

    public async validateAccessToken(token: string): Promise<ITokenDecoded> {
        return <ITokenDecoded>await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_SECRET_ACCESS'),
        });
    }

    public async validateRefreshToken(token: string): Promise<ITokenDecoded> {
        return <ITokenDecoded>await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_SECRET_REFRESH'),
        });
    }
}

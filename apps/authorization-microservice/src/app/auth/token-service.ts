import { UUIDService } from '@jerky/common';
import { TTokenDecoded, TTokenPayload, TTokens } from '@jerky/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@prisma/client/scripts/auth-client';
import { UserRole } from '@prisma/client/scripts/user-client';

import { TokenRepository } from './token-repository';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly tokenRepository: TokenRepository,
        private readonly uuidService: UUIDService,
    ) {}

    public async generateTokens(
        uuid: string,
        role: UserRole,
    ): Promise<TTokens> {
        return {
            accessToken: await this.generateAccessToken(uuid, role),
            refreshToken: await this.generateRefreshToken(uuid, role),
        };
    }

    public async generateAccessToken(
        uuid: string,
        role: UserRole,
    ): Promise<string> {
        return await this.jwtService.signAsync(<TTokenPayload>{ uuid, role }, {
            secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
            expiresIn: Number(this.configService.get<string>('JWT_ACCESS_EXP')),
            jwtid: this.uuidService.getUuid(),
        });
    }

    public async generateRefreshToken(
        uuid: string,
        role: UserRole,
    ): Promise<string> {
        return await this.jwtService.signAsync(<TTokenPayload>{ uuid, role }, {
            secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
            expiresIn: Number(
                this.configService.get<string>('JWT_REFRESH_EXP'),
            ),
            jwtid: this.uuidService.getUuid(),
        });
    }

    public async saveRefreshToken(refreshToken: string): Promise<string> {
        const decoded = await this.validateRefreshToken(refreshToken);
        if (!decoded) throw new BadRequestException();

        return await this.tokenRepository.save({
            select: {
                token: true,
            },
            data: {
                uuid: decoded.jti,
                token: refreshToken,
                exp: decoded.exp,
                iat: decoded.iat,
                userUuid: decoded.uuid,
            },
        });
    }

    public async findRefreshToken(
        refreshToken: string,
    ): Promise<RefreshToken | null> {
        return await this.tokenRepository.find({
            where: { token: refreshToken },
        });
    }

    public async deleteRefreshToken(
        refreshToken: string,
    ): Promise<RefreshToken | null> {
        return await this.tokenRepository.update({
            where: { token: refreshToken },
            data: { isActive: false },
        });
    }

    public async validateAccessToken(token: string): Promise<TTokenDecoded> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
        });
    }

    public async validateRefreshToken(token: string): Promise<TTokenDecoded> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
        });
    }
}

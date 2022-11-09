import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { RefreshToken } from '@prisma/client/scripts/auth-client';

@Injectable()
export class TokenRepository {
    constructor(private readonly prismaService: DbService) {}

    public async save({
        userUuid,
        exp,
        iat,
        uuid,
        token,
    }: RefreshToken): Promise<string> {
        const data = {
            uuid,
            userUuid,
            token,
            iat,
            exp,
        };

        const savedRefreshToken = await this.prismaService.refreshToken.create({
            data,
        });
        return savedRefreshToken.token;
    }

    public async find(refreshToken: string): Promise<RefreshToken | null> {
        return this.prismaService.refreshToken.findFirst({
            where: { token: refreshToken, isActive: true },
        });
    }

    public async delete(refreshToken: string): Promise<RefreshToken | null> {
        return this.prismaService.refreshToken.update({
            where: { token: refreshToken },
            data: { isActive: false },
        });
    }
}

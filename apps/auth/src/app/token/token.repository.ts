import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RefreshToken } from '@prisma/client/scripts/auth-client';

@Injectable()
export class TokenRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    ) {
        this.logger.debug(`${TokenRepository.name} init`);
    }

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

        const savedRefreshToken =
            await this.databaseService.refreshToken.create({
                data,
            });
        return savedRefreshToken.token;
    }

    public async find(refreshToken: string): Promise<RefreshToken | null> {
        return this.databaseService.refreshToken.findFirst({
            where: { token: refreshToken, isActive: true },
        });
    }

    public async delete(refreshToken: string): Promise<RefreshToken | null> {
        return this.databaseService.refreshToken.update({
            where: { token: refreshToken },
            data: { isActive: false },
        });
    }
}

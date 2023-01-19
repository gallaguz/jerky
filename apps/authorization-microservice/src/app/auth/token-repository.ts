import { Injectable } from '@nestjs/common';
import { Prisma, RefreshToken } from '@prisma/client/scripts/auth-client';

import { DatabaseService } from '../../database/database.service';
import RefreshTokenFindUniqueArgsBase = Prisma.RefreshTokenFindUniqueArgsBase;
import RefreshTokenCreateArgs = Prisma.RefreshTokenCreateArgs;
import RefreshTokenUpdateArgs = Prisma.RefreshTokenUpdateArgs;

@Injectable()
export class TokenRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    public async save(props: RefreshTokenCreateArgs): Promise<string> {
        const savedRefreshToken =
            await this.databaseService.refreshToken.create(props);
        return savedRefreshToken.token;
    }

    public async find(
        props: RefreshTokenFindUniqueArgsBase,
    ): Promise<RefreshToken | null> {
        return this.databaseService.refreshToken.findFirst(props);
    }

    public async update(
        props: RefreshTokenUpdateArgs,
    ): Promise<RefreshToken | null> {
        return this.databaseService.refreshToken.update(props);
    }
}

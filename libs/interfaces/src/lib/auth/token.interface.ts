import { UserRole } from '@prisma/client/scripts/user-client';

export type TTokenDecoded = {
    uuid: string;
    role: UserRole;
    iat: number;
    exp: number;
    jti: string;
};

export type TTokens = {
    accessToken: string;
    refreshToken: string;
};

export type TTokenPayload = {
    uuid: string;
    role: string;
    jti?: string;
};

export type TTokenOptions = {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
};

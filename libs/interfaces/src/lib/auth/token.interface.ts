import { Role } from '@prisma/client/scripts/user-client';

// class Class implements RefreshToken {
//     createdAt: Date;
//     exp: number;
//     iat: number;
//     id: number;
//     isActive: boolean;
//     token: string;
//     updatedAt: Date;
//     userUuid: string;
//     uuid: string;
// }

export interface ITokenDecoded {
    uuid: string;
    role: Role;
    iat: number;
    exp: number;
    jti: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    uuid: string;
    role: Role;
    jti?: string;
}

export interface ITokenOptions {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

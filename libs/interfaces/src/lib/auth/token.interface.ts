import { Role } from '../user';

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
export interface IAccessToken {
    uuid: string;
    role: Role;
    iat: number;
}
export interface IRefreshToken {
    uuid: string;
    iat: number;
}
export interface ITokenPayload {
    uuid: string;
    role: Role;
}

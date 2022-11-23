import { IsJWT } from 'class-validator';

export namespace AuthRefresh {
    export const topic = 'auth.refresh.command';

    export class Request {
        @IsJWT()
        refreshToken: string;
    }

    export class Response {
        refreshToken: string;
        accessToken: string;
    }
}

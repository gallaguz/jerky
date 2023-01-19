import { IsJWT } from 'class-validator';

export namespace InternalAuthRefreshCommandContract {
    export const topic = 'auth.refresh.command';

    export class Request {
        @IsJWT()
        refreshToken: string;
    }

    export class Response {
        accessToken: string;
    }
}

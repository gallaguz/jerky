import { IsJWT } from 'class-validator';

export namespace InternalAuthLogoutCommandContract {
    export const topic = 'auth.logout.command';

    export class Request {
        @IsJWT()
        refreshToken: string;
    }

    export class Response {}
}

export namespace InternalAuthHealthCheckQueryContract {
    export const topic = `auth.health-check.query`;

    export class Request {
        ping: boolean;
    }

    export class Response {
        pong: boolean;
    }
}

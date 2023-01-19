export namespace InternalUserHealthCheckQueryContract {
    export const topic = `user.health-check.query`;

    export class Request {
        ping: boolean;
    }

    export class Response {
        pong: boolean;
    }
}

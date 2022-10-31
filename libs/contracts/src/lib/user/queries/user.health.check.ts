export namespace UserHealthCheck {
    export const topic = `user.health-check.query`;

    export class Request {}

    export class Response {
        pong: boolean;
    }
}

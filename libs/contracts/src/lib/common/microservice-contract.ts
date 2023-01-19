export namespace MicroserviceConnectContract {
    export const topic = 'microservice.connect.contract';
    export class Request {
        ping: boolean;
    }
    export class Response {
        pong: boolean;
    }
}

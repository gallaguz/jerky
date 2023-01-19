import { IsUUID } from 'class-validator';

export namespace ExternalUserRemoveCommandContract {
    export class Request {
        @IsUUID()
        uuid: string;
    }
    export type Response = {
        uuid: string;
    };
}

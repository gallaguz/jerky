import { UserCreate } from '../../rmq';

export namespace HttpUserCreate {
    export class Request extends UserCreate.Request {}
    export type Response = UserCreate.Response;
}

import { UserRemove } from '../../rmq';

export namespace HttpUserRemove {
    export class Request extends UserRemove.Request {}
    export type Response = UserRemove.Response;
}

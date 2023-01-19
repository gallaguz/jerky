import { InternalUserUpdateCommandContract } from '../../internal';

export namespace ExternalUserUpdateContract {
    export class Request extends InternalUserUpdateCommandContract.Request {}
    export type Response = InternalUserUpdateCommandContract.Response;
}

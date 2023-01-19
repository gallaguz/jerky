import { InternalProductCreateCommandContract } from '../../../internal';

export namespace HttpProductCreate {
    export class Request extends InternalProductCreateCommandContract.Request {}
    export type Response = InternalProductCreateCommandContract.Response;
}

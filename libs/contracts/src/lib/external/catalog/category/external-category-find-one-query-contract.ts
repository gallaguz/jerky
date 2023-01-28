import { IsUUID } from 'class-validator';

import { InternalCategoryFindOneQueryContract } from '../../../internal';

export namespace ExternalCategoryFindOneQueryContract {
    export class Request {
        @IsUUID()
        uuid: string;
    }
    export type Response = InternalCategoryFindOneQueryContract.Response;
}

import { TRawTypeWithPayload } from '@jerky/interfaces';

import { RawTypeFindUniqueOrThrowArgsDto } from '../dto';

export namespace InternalRawTypeFindOneQueryContract {
    export const topic = 'catalog.raw-type-find-one.query';
    export class Request extends RawTypeFindUniqueOrThrowArgsDto {}
    export type Response = TRawTypeWithPayload;
}

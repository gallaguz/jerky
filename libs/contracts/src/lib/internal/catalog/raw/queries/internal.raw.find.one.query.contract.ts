import { TRawWithPayload } from '@jerky/interfaces';

import { RawFindUniqueOrThrowArgsDto } from '../dto';

export namespace InternalRawFindOneQueryContract {
    export const topic = 'catalog.raw-find-one.query';
    export class Request extends RawFindUniqueOrThrowArgsDto {}
    export type Response = TRawWithPayload;
}

import { TRawWithPayload } from '@jerky/interfaces';

import { RawFindManyArgsDto } from '../dto';

export namespace InternalRawFindManyQueryContract {
    export const topic = 'catalog.raw-find-many.query';
    export class Request extends RawFindManyArgsDto {}
    export type Response = TRawWithPayload[];
}

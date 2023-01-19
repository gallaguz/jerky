import { TRawTypeWithPayload } from '@jerky/interfaces';

import { RawTypeFindManyArgsDto } from '../dto';

export namespace InternalRawTypeFindManyQueryContract {
    export const topic = 'catalog.raw-type-find-many.query';
    export class Request extends RawTypeFindManyArgsDto {}
    export type Response = TRawTypeWithPayload[];
}

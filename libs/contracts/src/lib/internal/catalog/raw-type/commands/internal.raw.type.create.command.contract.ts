import { TRawTypeWithPayload } from '@jerky/interfaces';

import { RawTypeCreateArgsDto } from '../dto';

export namespace InternalRawTypeCreateCommandContract {
    export const topic = 'catalog.raw-type-create.command';
    export class Request extends RawTypeCreateArgsDto {}
    export type Response = TRawTypeWithPayload;
}

import { TRawTypeWithPayload } from '@jerky/interfaces';

import { RawTypeDeleteArgsDto } from '../dto';

export namespace InternalRawTypeRemoveCommandContract {
    export const topic = 'catalog.raw-type-remove.command';
    export class Request extends RawTypeDeleteArgsDto {}
    export type Response = TRawTypeWithPayload;
}

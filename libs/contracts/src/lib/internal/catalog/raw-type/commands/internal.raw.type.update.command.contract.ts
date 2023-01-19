import { TRawTypeWithPayload } from '@jerky/interfaces';

import { RawTypeUpdateArgsDto } from '../dto';

export namespace InternalRawTypeUpdateCommandContract {
    export const topic = 'catalog.raw-type-update.command';
    export class Request extends RawTypeUpdateArgsDto {}
    export type Response = TRawTypeWithPayload;
}

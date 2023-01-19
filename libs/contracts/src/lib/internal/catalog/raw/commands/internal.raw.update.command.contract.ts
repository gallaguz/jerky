import { TRawWithPayload } from '@jerky/interfaces';

import { RawUpdateArgsDto } from '../dto';

export namespace InternalRawUpdateCommandContract {
    export const topic = 'catalog.raw-update.command';
    export class Request extends RawUpdateArgsDto {}
    export type Response = TRawWithPayload;
}

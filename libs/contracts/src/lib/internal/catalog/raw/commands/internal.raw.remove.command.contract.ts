import { TRawWithPayload } from '@jerky/interfaces';

import { RawDeleteArgsDto } from '../dto';

export namespace InternalRawRemoveCommandContract {
    export const topic = 'catalog.raw-remove.command';
    export class Request extends RawDeleteArgsDto {}
    export type Response = TRawWithPayload;
}

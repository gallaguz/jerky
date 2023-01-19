import { TRawWithPayload } from '@jerky/interfaces';

import { RawCreateArgsDto } from '../dto';

export namespace InternalRawCreateCommandContract {
    export const topic = 'catalog.raw-create.command';
    export class Request extends RawCreateArgsDto {}
    export type Response = TRawWithPayload;
}

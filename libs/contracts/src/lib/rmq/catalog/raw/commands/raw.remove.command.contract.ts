import { Raw } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RawDto } from '../raw.dto';

export namespace RawRemoveCommandContract {
    export const topic = 'catalog.raw-remove.command';

    export class Request extends PickType(RawDto, ['uuid'] as const) {}

    export type Response = Raw;
}

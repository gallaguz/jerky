import { Raw } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RawDto } from '../raw.dto';

export namespace RawFindOneUuidQueryContract {
    export const topic = 'catalog.raw-find-one-uuid.query';

    export class Request extends PickType(RawDto, ['uuid'] as const) {
        uuid: string;
    }

    export type Response = Raw;
}

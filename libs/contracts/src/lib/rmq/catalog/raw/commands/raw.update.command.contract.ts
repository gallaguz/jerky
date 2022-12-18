import { Raw } from '@prisma/client/scripts/catalog-client';
import { PartialType } from '@nestjs/mapped-types';
import { RawDto } from '../raw.dto';

export namespace RawUpdateCommandContract {
    export const topic = 'catalog.raw-update.command';

    export class Request extends PartialType(RawDto) {
        uuid: string;
    }

    export type Response = Raw;
}

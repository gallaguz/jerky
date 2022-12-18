import { Raw } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RawDto } from '../raw.dto';

export namespace RawFindOneTitleQueryContract {
    export const topic = 'catalog.raw-find-one-Title.query';

    export class Request extends PickType(RawDto, ['title'] as const) {
        title: string;
    }

    export type Response = Raw;
}

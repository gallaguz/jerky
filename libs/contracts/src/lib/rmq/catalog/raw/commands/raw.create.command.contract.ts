import { Raw } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RawDto } from '../raw.dto';

export namespace RawCreateCommandContract {
    export const topic = 'catalog.raw-create.command';

    export class Request extends PickType(RawDto, [
        'title',
        'price',
        'description',
    ] as const) {
        title: string;
        price: number;
    }

    export type Response = Raw;
}

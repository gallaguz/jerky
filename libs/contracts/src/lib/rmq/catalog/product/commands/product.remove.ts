import { IsUUID } from 'class-validator';
import { ICategoryEntity, IProductEntity } from '@jerky/interfaces';

export namespace ProductRemove {
    export const topic = 'catalog.product-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IProductEntity;
}

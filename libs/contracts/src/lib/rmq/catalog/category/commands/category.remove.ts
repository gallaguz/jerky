import { IsUUID } from 'class-validator';
import { ICategoryEntity } from '@jerky/interfaces';

export namespace CategoryRemove {
    export const topic = 'catalog.category-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = ICategoryEntity;
}

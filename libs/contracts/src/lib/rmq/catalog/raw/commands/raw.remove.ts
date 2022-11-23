import { IsUUID } from 'class-validator';
import { IRawEntity } from '@jerky/interfaces';

export namespace RawRemove {
    export const topic = 'catalog.raw-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IRawEntity;
}

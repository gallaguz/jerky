import { FindOne } from '../../../../common';
import { IRawEntity } from '@jerky/interfaces';

export namespace RawFindOne {
    export const topic = 'catalog.raw-find-one.query';

    export class Request extends FindOne {}

    export type Response = IRawEntity;
}

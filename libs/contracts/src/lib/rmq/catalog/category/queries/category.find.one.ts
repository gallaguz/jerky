import { ICategoryEntity } from '@jerky/interfaces';
import { FindOne } from '../../../../common';

export namespace CategoryFindOne {
    export const topic = 'catalog.category-find-one.query';

    export class Request extends FindOne {}

    export type Response = ICategoryEntity;
}

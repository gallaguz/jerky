import { ICategoryEntity } from '@jerky/interfaces';
import { FindFiltered } from '../../../../common';

export namespace CategoryFindFiltered {
    export const topic = 'catalog.category-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = ICategoryEntity[];
}

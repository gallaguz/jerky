import { TCategoryWithPayload } from '@jerky/interfaces';

import { CategoryFindManyArgsDto } from '../dto';

export namespace InternalCategoryFindManyQueryContract {
    export const topic = 'catalog.category-find-many.query';
    export class Request extends CategoryFindManyArgsDto {}
    export type Response = TCategoryWithPayload[];
}

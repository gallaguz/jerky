import { TCategoryWithPayload } from '@jerky/interfaces';

import { CategoryFindUniqueOrThrowDto } from '../dto';

export namespace InternalCategoryFindOneQueryContract {
    export const topic = 'catalog.category-find-one.query';
    export class Request extends CategoryFindUniqueOrThrowDto {}
    export type Response = TCategoryWithPayload;
}

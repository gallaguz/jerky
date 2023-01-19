import { TCategoryWithPayload } from '@jerky/interfaces';

import { CategoryCreateArgsDto } from '../dto';

export namespace InternalCategoryCreateCommandContract {
    export const topic = 'catalog.category-create.command';
    export class Request extends CategoryCreateArgsDto {}
    export type Response = TCategoryWithPayload;
}

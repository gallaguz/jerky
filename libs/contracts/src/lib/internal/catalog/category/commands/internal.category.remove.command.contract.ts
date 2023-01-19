import { TCategoryWithPayload } from '@jerky/interfaces';

import { CategoryDeleteArgsDto } from '../dto';

export namespace InternalCategoryRemoveCommandContract {
    export const topic = 'catalog.category-remove.command';
    export class Request extends CategoryDeleteArgsDto {}
    export type Response = TCategoryWithPayload;
}

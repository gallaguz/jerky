import { TCategoryWithPayload } from '@jerky/interfaces';

import { CategoryUpdateArgsDto } from '../dto';

export namespace InternalCategoryUpdateCommandContract {
    export const topic = 'catalog.category-update.command';
    export class Request extends CategoryUpdateArgsDto {}
    export type Response = TCategoryWithPayload;
}

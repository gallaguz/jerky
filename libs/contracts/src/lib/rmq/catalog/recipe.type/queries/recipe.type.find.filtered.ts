import { IRecipeTypeEntity } from '@jerky/interfaces';
import { FindFiltered } from '../../../../common';

export namespace RecipeTypeFindFiltered {
    export const topic = 'catalog.recipe-type-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = IRecipeTypeEntity[];
}

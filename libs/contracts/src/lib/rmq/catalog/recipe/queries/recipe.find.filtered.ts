import { FindFiltered } from '../../../../common';
import { IRecipeEntity } from '@jerky/interfaces';

export namespace RecipeFindFiltered {
    export const topic = 'catalog.recipe-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = IRecipeEntity[];
}

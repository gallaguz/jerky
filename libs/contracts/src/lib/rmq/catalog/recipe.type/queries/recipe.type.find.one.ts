import { IRecipeTypeEntity } from '@jerky/interfaces';
import { FindOne } from '../../../../common';

export namespace RecipeTypeFindOne {
    export const topic = 'catalog.recipe-type-find-one.query';

    export class Request extends FindOne {}

    export type Response = IRecipeTypeEntity;
}

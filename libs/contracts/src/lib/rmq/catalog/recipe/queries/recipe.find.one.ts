import { FindOne } from '../../../../common';
import { IRecipeEntity } from '@jerky/interfaces';

export namespace RecipeFindOne {
    export const topic = 'catalog.recipe-find-one.query';

    export class Request extends FindOne {}

    export type Response = IRecipeEntity;
}

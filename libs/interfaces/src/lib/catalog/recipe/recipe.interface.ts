import {
    CreateBase,
    FindOneTitleBase,
    FindOneUuidBase,
    IBaseEntity,
    RemoveBase,
    UpdateBase,
} from '../common';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import {
    ConnectionActions,
    IngredientConnectionModelNames,
} from '@jerky/enums';

// type IIngredientQtyConnect = {
//     connect: {
//         uuid: string;
//     };
// };
//
// type IIngredientQtyDisconnect = {
//     disconnect: {
//         uuid: string;
//     };
// };

export interface IRecipeEntity extends IBaseEntity<Recipe, IRecipeCreate> {
    uuid: string;
    title: string;

    description?: string;

    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
}

export type IRecipeCreate = CreateBase & {
    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
};
export type IRecipeUpdate = UpdateBase & {
    recipeTypeUuid?: string;
    categoryUuid?: string;
    rawUuid?: string;
};
export type IRecipeRemove = RemoveBase;
export type IRecipeFindOneUuid = FindOneUuidBase;
export type IRecipeFindOneTitle = FindOneTitleBase;

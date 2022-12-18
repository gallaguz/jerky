import {
    Ingredient,
    IngredientForm,
} from '@prisma/client/scripts/catalog-client';
import {
    CreateBase,
    FindOneTitleBase,
    FindOneUuidBase,
    IBaseEntity,
    RemoveBase,
    UpdateBase,
} from '../common';
import {
    ConnectionActions,
    IngredientConnectionModelNames,
} from '@jerky/enums';

export type IIngredientQty = {
    uuid: string;
    qtyPerKg: number;
};

export type IIngredientQtyConnection = {
    model: IngredientConnectionModelNames;
    action: ConnectionActions;
    data: IIngredientQty[];
};

export interface IIngredientEntity
    extends IBaseEntity<Ingredient, IIngredientCreate> {
    uuid: string;
    title: string;
    price: number;
    form?: IngredientForm;
    description?: string;
}

export type IIngredientCreate = CreateBase & {
    price: number;
    form?: IngredientForm;
    ingredientQtyConnection: IIngredientQtyConnection;
};
export type IIngredientUpdate = UpdateBase & {
    price?: number;
    form?: IngredientForm;
    ingredientQtyConnection?: IIngredientQtyConnection;
};
export type IIngredientRemove = RemoveBase;
export type IIngredientFindOneUuid = FindOneUuidBase;
export type IIngredientFindOneTitle = FindOneTitleBase;

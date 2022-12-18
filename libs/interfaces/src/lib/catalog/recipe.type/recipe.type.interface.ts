import {
    CreateBase,
    FindOneTitleBase,
    FindOneUuidBase,
    IBaseEntity,
    RemoveBase,
    UpdateBase,
} from '../common';
import { RecipeType } from '@prisma/client/scripts/catalog-client';

export interface IRecipeTypeEntity
    extends IBaseEntity<RecipeType, IRecipeTypeCreate> {
    uuid: string;
    title: string;
    description?: string;
}

export interface IRecipeTypeDto {
    uuid: string;
    title: string;
    description?: string | null;
}

export type IRecipeTypeCreate = CreateBase;
export type IRecipeTypeUpdate = UpdateBase;
export type IRecipeTypeRemove = RemoveBase;
export type IRecipeTypeFindOneUuid = FindOneUuidBase;
export type IRecipeTypeFindOneTitle = FindOneTitleBase;

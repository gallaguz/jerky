import {
    IBaseEntity,
    CreateBase,
    FindOneTitleBase,
    FindOneUuidBase,
    RemoveBase,
    UpdateBase,
} from '../common';
import { Category } from '@prisma/client/scripts/catalog-client';

export interface ICategoryEntity
    extends IBaseEntity<Category, ICategoryCreate> {
    uuid: string;
    title: string;
    description?: string;
}

export type ICategoryCreate = CreateBase;
export type ICategoryUpdate = UpdateBase;
export type ICategoryRemove = RemoveBase;
export type ICategoryFindOneUuid = FindOneUuidBase;
export type ICategoryFindOneTitle = FindOneTitleBase;

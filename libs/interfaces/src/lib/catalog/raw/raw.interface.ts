import {
    CreateBase,
    FindOneTitleBase,
    FindOneUuidBase,
    IBaseEntity,
    RemoveBase,
    UpdateBase,
} from '../common';
import { Raw } from '@prisma/client/scripts/catalog-client';

export interface IRawEntity extends IBaseEntity<Raw, CreateBase> {
    uuid: string;
    title: string;
    description?: string;

    price: number;
}

export type IRawCreate = CreateBase;
export type IRawUpdate = UpdateBase & { price: number };
export type IRawRemove = RemoveBase;
export type IRawFindOneUuid = FindOneUuidBase;
export type IRawFindOneTitle = FindOneTitleBase;

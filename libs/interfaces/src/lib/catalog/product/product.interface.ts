import { IBaseEntity } from '../common';
import { Product } from '@prisma/client/scripts/catalog-client';

export interface IProductEntity extends IBaseEntity<Product, IProductDto> {
    uuid: string;
    title: string;
    description?: string;
    price: number;
    recipeUuid: string;
    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
}

export interface IProductDto {
    uuid: string;
    title: string;
    price?: number;
    description?: string;
    recipeUuid?: string;
    recipeTypeUuid?: string;
    categoryUuid?: string;
    rawUuid?: string;
}

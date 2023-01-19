import { RecipeOrderByRelationAggregateInputDto } from '@jerky/contracts';
import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { ProductOrderByRelationAggregateInputDto } from '../../../../product/dto/other/aggregate/product-order-by-relation-aggregate-input-dto';
import SortOrder = Prisma.SortOrder;

export class RawOrderByWithRelationInputDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    createdAt?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    updatedAt?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    alias?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    title?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    description?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    price?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    payload?: SortOrder;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductOrderByRelationAggregateInputDto)
    product?: ProductOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeOrderByRelationAggregateInputDto)
    recipe?: RecipeOrderByRelationAggregateInputDto;
}

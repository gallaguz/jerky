import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import SortOrder = Prisma.SortOrder;
import { CategoryOrderByRelationAggregateInputDto } from '../../../../category';
import { RawOrderByRelationAggregateInputDto } from '../../../../raw';
import { RawTypeOrderByRelationAggregateInputDto } from '../../../../raw-type';
import { RecipeOrderByWithRelationInputDto } from '../../../../recipe';
import { RecipeTypeOrderByRelationAggregateInputDto } from '../../../../recipe-type';

export class ProductOrderByWithRelationInputDto {
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
    @ValidateNested()
    @Type(() => RecipeOrderByWithRelationInputDto)
    recipe?: RecipeOrderByWithRelationInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryOrderByRelationAggregateInputDto)
    category?: CategoryOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawOrderByRelationAggregateInputDto)
    raw?: RawOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeOrderByRelationAggregateInputDto)
    rawType?: RawTypeOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeOrderByRelationAggregateInputDto)
    recipeType?: RecipeTypeOrderByRelationAggregateInputDto;
}

import { Prisma } from '@prisma/client/scripts/catalog-client';
import SortOrder = Prisma.SortOrder;
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { ProductAvgOrderByAggregateInputDto } from './product-avg-order-by-aggregate-input-dto';
import { ProductCountOrderByAggregateInputDto } from './product-count-order-by-aggregate-input-dto';
import { ProductMaxOrderByAggregateInputDto } from './product-max-order-by-aggregate-input-dto';
import { ProductMinOrderByAggregateInputDto } from './product-min-order-by-aggregate-input-dto';
import { ProductSumOrderByAggregateInputDto } from './product-sum-order-by-aggregate-input-dto';

export class ProductOrderByWithAggregationInputDto {
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
    recipeUuid?: SortOrder;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductCountOrderByAggregateInputDto)
    _count?: ProductCountOrderByAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAvgOrderByAggregateInputDto)
    _avg?: ProductAvgOrderByAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMaxOrderByAggregateInputDto)
    _max?: ProductMaxOrderByAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMinOrderByAggregateInputDto)
    _min?: ProductMinOrderByAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSumOrderByAggregateInputDto)
    _sum?: ProductSumOrderByAggregateInputDto;
}

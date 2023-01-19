import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import SortOrder = Prisma.SortOrder;

export class ProductMinAggregateInputTypeDto {
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
    @IsBoolean()
    price?: true;
}

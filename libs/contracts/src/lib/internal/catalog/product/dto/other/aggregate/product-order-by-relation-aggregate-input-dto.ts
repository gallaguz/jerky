import { Prisma } from '@prisma/client/scripts/catalog-client';
import { IsOptional, IsString } from 'class-validator';
import SortOrder = Prisma.SortOrder;
import { Transform } from 'class-transformer';

export class ProductOrderByRelationAggregateInputDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    _count?: SortOrder;
}

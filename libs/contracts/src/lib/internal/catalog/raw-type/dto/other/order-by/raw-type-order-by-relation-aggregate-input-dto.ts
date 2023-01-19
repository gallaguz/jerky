import { Prisma } from '@prisma/client/scripts/catalog-client';
import SortOrder = Prisma.SortOrder;
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RawTypeOrderByRelationAggregateInputDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    _count?: SortOrder;
}

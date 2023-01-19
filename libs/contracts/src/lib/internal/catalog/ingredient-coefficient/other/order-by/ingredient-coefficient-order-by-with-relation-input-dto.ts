import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import SortOrder = Prisma.SortOrder;

export class IngredientCoefficientOrderByWithRelationInputDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return false;
    })
    coefficient?: SortOrder;
}

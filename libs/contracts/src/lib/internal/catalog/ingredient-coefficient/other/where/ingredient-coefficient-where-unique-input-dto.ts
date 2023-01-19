import { IsOptional, IsUUID } from 'class-validator';

export class IngredientCoefficientWhereUniqueInputDto {
    @IsOptional()
    @IsUUID()
    uuid?: string;
}

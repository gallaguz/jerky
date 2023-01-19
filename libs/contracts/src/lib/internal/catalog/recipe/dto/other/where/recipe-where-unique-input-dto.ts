import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RecipeWhereUniqueInputDto {
    @IsOptional()
    @IsUUID()
    uuid?: string;

    @IsOptional()
    @IsString()
    alias?: string;

    @IsOptional()
    @IsString()
    title?: string;
}

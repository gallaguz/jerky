import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RecipeTypeWhereUniqueInputDto {
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

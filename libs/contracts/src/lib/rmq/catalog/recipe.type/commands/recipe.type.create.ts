import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IRecipeTypeEntity } from '@jerky/interfaces';

export namespace RecipeTypeCreate {
    export const topic = 'catalog.recipe-type-create.command';

    export class Request {
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title: string;

        @IsString()
        @IsOptional()
        comment?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IRecipeTypeEntity;
}

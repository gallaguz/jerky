import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ICategoryEntity, IRecipeEntity } from '@jerky/interfaces';

export namespace RecipeCreate {
    export const topic = 'catalog.recipe-create.command';

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

    export type Response = IRecipeEntity;
}

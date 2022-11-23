import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ICategoryEntity, IRecipeEntity } from '@jerky/interfaces';

export namespace RecipeUpdate {
    export const topic = 'catalog.recipe-update.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title?: string;

        @IsString()
        @IsOptional()
        comment?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IRecipeEntity;
}

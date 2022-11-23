import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IRecipeTypeEntity } from '@jerky/interfaces';

export namespace RecipeTypeUpdate {
    export const topic = 'catalog.recipe-type-update.command';

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

    export type Response = IRecipeTypeEntity;
}

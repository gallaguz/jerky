import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ICategoryEntity, IIngredientEntity } from '@jerky/interfaces';

export namespace IngredientUpdate {
    export const topic = 'catalog.ingredient-update.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsPositive()
        @IsNumber()
        @IsOptional()
        price?: number;

        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IIngredientEntity;
}

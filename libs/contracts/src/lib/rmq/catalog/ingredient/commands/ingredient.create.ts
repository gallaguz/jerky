import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ICategoryEntity, IIngredientEntity } from '@jerky/interfaces';

export namespace IngredientCreate {
    export const topic = 'catalog.ingredient-create.command';

    export class Request {
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title: string;

        @IsPositive()
        @IsNumber()
        price: number;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IIngredientEntity;
}

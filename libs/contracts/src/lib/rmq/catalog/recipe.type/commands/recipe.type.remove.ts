import { IsString, IsUUID } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeTypeDto } from '../recipe.type.dto';

export namespace RecipeTypeRemove {
    export const topic = 'catalog.recipe-type-remove.command';

    export class Request extends PickType(RecipeTypeDto, ['uuid'] as const) {}

    export type Response = RecipeType;
}

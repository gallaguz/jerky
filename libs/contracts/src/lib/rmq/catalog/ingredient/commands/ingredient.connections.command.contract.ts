import { Raw } from '@prisma/client/scripts/catalog-client';

import {
    ConnectionActions,
    IngredientConnectionModelNames,
} from '@jerky/enums';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace IngredientConnectionsCommandContract {
    export const topic = 'catalog.ingredient-connection.command';

    export class Request {
        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        uuid: string;

        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        targetUuid: string;

        @IsEnum(IngredientConnectionModelNames)
        model: IngredientConnectionModelNames;

        @IsEnum(ConnectionActions)
        action: ConnectionActions;
    }

    export type Response = Raw;
}

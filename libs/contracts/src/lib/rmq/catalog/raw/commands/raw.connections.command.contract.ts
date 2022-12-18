import { Raw } from '@prisma/client/scripts/catalog-client';

import { ConnectionActions, RawConnectionModelNames } from '@jerky/enums';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace RawConnectionsCommandContract {
    export const topic = 'catalog.raw-connection.command';

    export class Request {
        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        uuid: string;

        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        targetUuid: string;

        @IsEnum(RawConnectionModelNames)
        model: RawConnectionModelNames;

        @IsEnum(ConnectionActions)
        action: ConnectionActions;
    }

    export type Response = Raw;
}

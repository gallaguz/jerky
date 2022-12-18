import { IsString, IsUUID } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export class FindOne {
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    uuid: string;
}

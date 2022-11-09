import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IUser, Role } from '@jerky/interfaces';
import { EMAIL, PASSWORD } from '@jerky/constants';

export namespace UserCreate {
    export const topic = 'user.create.command';

    export class Request {
        @IsEmail({}, { message: EMAIL.MUST_BE_A_VALID_EMAIL })
        @IsString({ message: EMAIL.MUST_BE_A_STRING })
        email: string;

        @IsString({ message: PASSWORD.MUST_BE_A_STRING })
        @MinLength(8, { message: PASSWORD.MUST_BE_LONGER })
        @MaxLength(64, { message: PASSWORD.MUST_BE_SHORTER })
        password: string;

        @IsOptional()
        @IsEnum(Role)
        role?: Role;
    }

    export type Response = IUser;
}

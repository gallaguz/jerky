import { IsEnum, IsUUID } from 'class-validator';
import { IUser, Role } from '@jerky/interfaces';

export namespace UserUpdateRole {
    export const topic = 'user.update-role.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsEnum(Role)
        role: Role;
    }

    export type Response = IUser;
}

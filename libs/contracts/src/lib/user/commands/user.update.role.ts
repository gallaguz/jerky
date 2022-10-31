import { IsEnum, IsUUID } from 'class-validator';
import { Role, User } from '@prisma/client';

export namespace UserUpdateRole {
    export const topic = 'user.update-role.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsEnum(Role)
        role: Role;
    }

    export type Response = User;
}

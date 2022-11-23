import { IUser } from '@jerky/interfaces';
import { User } from '@prisma/client/scripts/user-client';
import { Role } from '@jerky/enums';

export class UserModel implements IUser {
    createdAt: Date;
    updatedAt: Date;
    uuid: string;
    email: string;
    passwordHash: string;
    role: Role;

    constructor(user: User) {
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.uuid = user.uuid;
        this.email = user.email;
        this.passwordHash = user.passwordHash;
        this.role = <Role>user.role;
    }
}

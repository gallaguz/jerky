import { IUserEntity } from '@jerky/interfaces';
import { Role } from '@prisma/client';
import { UserBase } from './user.base';

export class UserEntity extends UserBase implements IUserEntity {
    email: string;
    role: Role;

    constructor(email?: string, passwordHash?: string, role: Role = Role.USER) {
        super();
        this.generateUUID();

        if (email) {
            this.email = email;
        }
        if (passwordHash) {
            this._passwordHash = passwordHash;
        }
        if (role) {
            this.role = role;
        }
    }

    public updateEmail(email: string): this {
        this.email = email;
        return this;
    }

    public updatePassword(passwordHash: string): this {
        this._passwordHash = passwordHash;
        return this;
    }

    public updateRole(role: Role): this {
        this.role = role;
        return this;
    }
}

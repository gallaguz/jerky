import { IUserEntity, TRole, Role } from '@jerky/interfaces';
import { UserBase } from './user.base';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity extends UserBase implements IUserEntity {
    email: string;
    role: TRole;

    constructor(
        email?: string,
        passwordHash?: string,
        role: TRole = Role.USER,
    ) {
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

    public async setPassword(password: string): Promise<UserEntity> {
        const salt = await genSalt(10);
        this._passwordHash = await hash(password, salt);
        return this;
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this._passwordHash);
    }

    public updateEmail(email: string): this {
        this.email = email;
        return this;
    }

    public updatePassword(passwordHash: string): this {
        this._passwordHash = passwordHash;
        return this;
    }

    public updateRole(role: TRole): this {
        this.role = role;
        return this;
    }
}

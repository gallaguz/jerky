import { IUserEntity, TRole } from '@jerky/interfaces';
import { UserBase } from './user.base';
import { compare, genSalt, hash } from 'bcryptjs';
import { Role } from '@jerky/enums';

export class UserEntity extends UserBase implements IUserEntity {
    email: string;
    role: TRole;

    constructor(
        uuid?: string,
        email?: string,
        passwordHash?: string,
        role: TRole = Role.USER,
    ) {
        super();
        if (email) this.email = email;
        if (passwordHash) this._passwordHash = passwordHash;
        if (role) this.role = role;
        this._uuid = uuid ?? this.generateUUID();
    }

    public async setPassword(password: string): Promise<this> {
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

    public async updatePassword(newPassword: string): Promise<this> {
        return await this.setPassword(newPassword);
    }

    public updateRole(role: TRole): this {
        this.role = role;
        return this;
    }
}

import { v4 as uuid } from 'uuid';

export class UserServiceBase {
    public generateUUID(): string {
        return uuid();
    }

    protected excludePrivateProperties<User, Key extends keyof User>(
        user: User,
        ...keys: Key[]
    ): Omit<User, Key> {
        for (const key of keys) {
            delete user[key];
        }
        return user;
    }
}

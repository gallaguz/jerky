import { v4 as uuid } from 'uuid';
import { IDomainEvent } from '@jerky/interfaces';

export abstract class UserBase {
    protected _passwordHash: string;
    protected _uuid: string;
    protected _events: IDomainEvent[] = [];

    protected constructor() {
        //
    }

    public publishEvent(topic: string, data: unknown): void {
        this._events.push(<IDomainEvent>{
            topic,
            data,
        });
    }

    public get events(): IDomainEvent[] {
        return this._events;
    }

    public get uuid(): string {
        return this._uuid;
    }

    public get passwordHash(): string {
        return this._passwordHash;
    }

    public generateUUID(): string {
        return uuid();
    }

    // protected excludePrivateProperties<User, Key extends keyof User>(
    //     user: User,
    //     ...keys: Key[]
    // ): Omit<User, Key> {
    //     for (const key of keys) {
    //         delete user[key];
    //     }
    //     return user;
    // }
}

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

    public generateUUID(): void {
        this._uuid = uuid();
    }

    // public async setPassword(password: string): Promise<this> {
    //     const salt = await genSalt(10);
    //     this._passwordHash = await hash(password, salt);
    //     return this;
    // }
    //
    // public validatePassword(password: string): Promise<boolean> {
    //     return compare(password, this._passwordHash);
    // }
}

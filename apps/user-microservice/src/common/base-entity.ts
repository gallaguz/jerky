import {
    IDomainEvent,
    TUserModelBase,
    TUserUpdateBase,
} from '@jerky/interfaces';
import { UserRole } from '@prisma/client/scripts/user-client';

export abstract class UserEntityBase {
    private readonly _uuid: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _passwordHash: string;
    private _salt: string;
    private _email: string;
    private _role: UserRole;
    private _events: IDomainEvent[] = [];

    protected constructor(props: TUserModelBase) {
        if (props.uuid) this._uuid = props.uuid;
        if (props.createdAt) this._createdAt = props.createdAt;
        if (props.updatedAt) this._updatedAt = props.updatedAt;
        if (props.email) this._email = props.email;
        if (props.passwordHash) this._passwordHash = props.passwordHash;
        if (props.salt) this._salt = props.salt;
        if (props.role) this._role = props.role;
    }

    public updateBase(props: TUserUpdateBase): void {
        if (props.createdAt) this.setCreatedAt(props.createdAt);
        if (props.updatedAt) this.setUpdatedAt(props.updatedAt);
        if (props.email) this.setEmail(props.email);
        if (props.passwordHash) this.setPasswordHash(props.passwordHash);
        if (props.salt) this.setSalt(props.salt);
        if (props.role) this.setRole(props.role);
    }

    protected publishEvent(topic: string, data?: unknown): void {
        const event: IDomainEvent = {
            topic,
            data,
        };
        this._events.push(event);
    }
    public get events(): IDomainEvent[] {
        return this._events;
    }

    public get uuid(): string {
        return this._uuid;
    }
    public get createdAt(): Date {
        return this._createdAt;
    }
    public get updatedAt(): Date {
        return this._updatedAt;
    }
    public get role(): UserRole {
        return this._role;
    }
    public get email(): string {
        return this._email;
    }
    public get passwordHash(): string {
        return this._passwordHash;
    }
    public get salt(): string {
        return this._salt;
    }

    public setCreatedAt(createdAt: Date): void {
        this._createdAt = createdAt;
    }
    public setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt;
    }
    public setRole(role: UserRole): void {
        this._role = role;
    }
    public setEmail(email: string): void {
        this._email = email;
    }
    public setPasswordHash(passwordHash: string): void {
        this._passwordHash = passwordHash;
    }
    public setSalt(salt: string): void {
        this._salt = salt;
    }
}

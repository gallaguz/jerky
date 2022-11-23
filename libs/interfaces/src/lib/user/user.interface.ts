import { Role } from '@jerky/enums';
import { IDomainEvent } from '../domain';

export interface IUserEntity {
    email: string;
    passwordHash?: string;
    role?: TRole;
    events: IDomainEvent[];
}

export interface IUser {
    id?: number;
    createdAt: Date;
    updatedAt: Date;
    uuid: string;
    email: string;
    passwordHash: string;
    role: Role;
}

export type TRole = typeof Role[keyof typeof Role];

import { Role } from '@prisma/client';

export interface IDomainEvent {
    topic: string;
    data: unknown;
}

export interface IUserEntity {
    email: string;
    passwordHash?: string;
    role?: Role;
    events: IDomainEvent[];
}

export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export interface IDomainEvent {
    topic: string;
    data: unknown;
}

export interface IUserEntity {
    email: string;
    passwordHash?: string;
    role?: TRole;
    events: IDomainEvent[];
}

export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export interface ICredentials {
    email: string;
    password: string;
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

export enum Role {
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export type TRole = typeof Role[keyof typeof Role];

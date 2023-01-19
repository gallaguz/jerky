import { UserRole } from '@prisma/client/scripts/user-client';

import { TModelBase } from '../common';
import { IDomainEvent } from '../domain';

export interface IBaseUserEntity {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    passwordHash: string;
    salt: string;
    email: string;
    role: UserRole;
    events: IDomainEvent[];
}

export type TUserCredentials = {
    email: string;
    password: string;
    role: UserRole;
};

export type TUserModelBase = TModelBase & {
    passwordHash?: string | null;
    salt?: string | null;
    email?: string | null;
    role?: UserRole | null;
};

export type TUser = TUserModelBase;

export type TRole = typeof UserRole[keyof typeof UserRole];

export type TUserUpdateBase = {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    passwordHash?: string | null;
    salt?: string | null;
    email?: string | null;
    role?: UserRole | null;
};
export type TUserUpdate = TUserUpdateBase;

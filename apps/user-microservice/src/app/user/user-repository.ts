import { IBaseRepository } from '@jerky/interfaces';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client/scripts/user-client';

import { DatabaseService } from '../../database/database-service';
import { UserDatabaseErrorHandlerService } from '../../database/user-database-error-handler-service';
import UserCreateArgs = Prisma.UserCreateArgs;
import UserUpdateArgs = Prisma.UserUpdateArgs;
import UserFindManyArgs = Prisma.UserFindManyArgs;
import UserDeleteArgs = Prisma.UserDeleteArgs;
import UserFindUniqueArgs = Prisma.UserFindUniqueArgs;

@Injectable()
export class UserRepository
    implements
        IBaseRepository<
            User,
            UserCreateArgs,
            UserUpdateArgs,
            UserFindManyArgs,
            UserFindUniqueArgs,
            UserDeleteArgs
        >
{
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly userDatabaseErrorHandlerService: UserDatabaseErrorHandlerService,
    ) {}

    public async create(props: UserCreateArgs): Promise<User> {
        return await this.databaseService.user.create(props).catch((error) => {
            throw this.userDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async update(props: UserUpdateArgs): Promise<User> {
        return await this.databaseService.user.update(props).catch((error) => {
            throw this.userDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async remove(props: UserDeleteArgs): Promise<User> {
        return await this.databaseService.user.delete(props).catch((error) => {
            throw this.userDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async findOne(props: UserFindUniqueArgs): Promise<User | null> {
        return await this.databaseService.user
            .findUnique(props)
            .catch((error) => {
                throw this.userDatabaseErrorHandlerService.handleError(error);
            });
    }

    public async findMany(props: UserFindManyArgs): Promise<User[]> {
        return await this.databaseService.user
            .findMany(props)
            .catch((error) => {
                throw this.userDatabaseErrorHandlerService.handleError(error);
            });
    }
}

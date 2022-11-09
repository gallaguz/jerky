import { Injectable, Logger } from '@nestjs/common';

import { DbService } from '../db/db.service';
import { UserFindFiltered } from '@jerky/contracts';
import { Role } from '@jerky/interfaces';
import { User } from '@prisma/client/scripts/user-client';
import { SOMETHING_WENT_WRONG } from '@jerky/constants';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: DbService) {}

    public async create(
        uuid: string,
        email: string,
        passwordHash: string,
        role?: Role,
    ): Promise<User | null> {
        try {
            return await this.prismaService.user.create({
                data: { uuid, email, passwordHash, role },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async delete(uuid: string): Promise<User | null> {
        try {
            return await this.prismaService.user.delete({
                where: { uuid },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        try {
            return await this.prismaService.user.findUnique({
                where: { email },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async findOneByUuid(uuid: string): Promise<User | null> {
        try {
            return await this.prismaService.user.findFirst({
                where: { uuid },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async updateEmail(
        uuid: string,
        email: string,
    ): Promise<User | null> {
        try {
            return await this.prismaService.user.update({
                where: { uuid },
                data: { email },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async updatePasswordHash(
        uuid: string,
        passwordHash: string,
    ): Promise<User | null> {
        try {
            return await this.prismaService.user.update({
                where: { uuid },
                data: { passwordHash },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async updateRole(uuid: string, role: Role): Promise<User | null> {
        try {
            return await this.prismaService.user.update({
                where: { uuid },
                data: { role },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }

    public async findFiltered({
        searchString,
        skip,
        take,
        orderBy,
    }: UserFindFiltered.Request): Promise<User[] | null> {
        try {
            const or = searchString
                ? {
                      OR: [{ email: { contains: searchString } }],
                  }
                : {};
            return await this.prismaService.user.findMany({
                where: {
                    ...or,
                },
                take: Number(take) || 10,
                skip: Number(skip) || undefined,
                orderBy: {
                    createdAt: orderBy,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                Logger.error(SOMETHING_WENT_WRONG);
            }
            return null;
        }
    }
}

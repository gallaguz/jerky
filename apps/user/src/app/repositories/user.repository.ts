import { Injectable, Logger } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { UserFindFiltered } from '@jerky/contracts';
import { User } from '@prisma/client/scripts/user-client';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { Role } from '@jerky/enums';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        private readonly prismaService: DatabaseService,
        private readonly configService: ConfigService,
    ) {}

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

    public async update({
        uuid,
        role,
        email,
        passwordHash,
    }: UserEntity): Promise<User | null> {
        try {
            return await this.prismaService.user.update({
                where: { uuid },
                data: { role, email, passwordHash },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log({
                    uuid,
                    role,
                    email,
                    passwordHash,
                });

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
                take:
                    Number(take) ||
                    Number(this.configService.get('TAKE_DEFAULT')),
                skip: Number(skip) || undefined,
                orderBy: {
                    createdAt:
                        orderBy || this.configService.get('ORDER_BY_DEFAULT'),
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

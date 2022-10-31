import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { PrismaService } from '../db/prisma.service';
import { UserFindFiltered } from '@jerky/contracts';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async create(
        uuid: string,
        email: string,
        passwordHash: string,
        role?: Role,
    ): Promise<User | null> {
        return await this.prismaService.user.create({
            data: { uuid, email, passwordHash, role },
        });
    }

    public async delete(uuid: string): Promise<User | null> {
        return await this.prismaService.user.delete({
            where: { uuid },
        });
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: { email },
        });
    }

    public async findOneByUuid(uuid: string): Promise<User | null> {
        return await this.prismaService.user.findFirst({
            where: { uuid },
        });
    }

    public async updateEmail(
        uuid: string,
        email: string,
    ): Promise<User | null> {
        return await this.prismaService.user.update({
            where: { uuid },
            data: { email },
        });
    }

    public async updatePasswordHash(
        uuid: string,
        passwordHash: string,
    ): Promise<User | null> {
        return await this.prismaService.user.update({
            where: { uuid },
            data: { passwordHash },
        });
    }

    public async updateRole(uuid: string, role: Role): Promise<User | null> {
        return await this.prismaService.user.update({
            where: { uuid },
            data: { role },
        });
    }

    public async findFiltered({
        searchString,
        skip,
        take,
        orderBy,
    }: UserFindFiltered.Request): Promise<User[]> {
        const or = searchString
            ? {
                  OR: [{ email: { contains: searchString } }],
              }
            : {};
        return this.prismaService.user.findMany({
            where: {
                ...or,
            },
            take: Number(take) || 10,
            skip: Number(skip) || undefined,
            orderBy: {
                createdAt: orderBy,
            },
        });
    }
}

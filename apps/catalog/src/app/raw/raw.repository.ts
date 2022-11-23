import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import { RawEntity } from './raw.entity';
import { FindFiltered } from '@jerky/contracts';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;

@Injectable()
export class RawRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly configService: ConfigService,
    ) {}

    public async create({
        uuid,
        title,
        description,
        price,
        categoryUuid,
    }: RawEntity): Promise<Raw> {
        try {
            return await this.databaseService.raw.create({
                data: {
                    uuid,
                    title,
                    description,
                    price,
                    category: {
                        connect: { uuid: categoryUuid },
                    },
                },
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            }

            if (e instanceof Prisma.PrismaClientValidationError) {
                throw new BadRequestException();
            }
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') throw new ConflictException();
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findFiltered({
        take,
        skip,
        orderBy,
        searchString,
    }: FindFiltered): Promise<Raw[]> {
        try {
            const or = searchString
                ? {
                      OR: [{ title: { contains: searchString } }],
                  }
                : {};

            return await this.databaseService.raw.findMany({
                where: {
                    ...or,
                },
                take:
                    Number(take) ||
                    Number(this.configService.get('TAKE_DEFAULT')),
                skip: Number(skip) || undefined,
                orderBy: {
                    title:
                        orderBy || this.configService.get('ORDER_BY_DEFAULT'),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findOne(uuid: string): Promise<Raw | null> {
        try {
            return await this.databaseService.raw.findUnique({
                where: {
                    uuid,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async update({
        uuid,
        title,
        description,
        price,
        categoryUuid,
    }: RawEntity): Promise<Raw> {
        try {
            const connect = categoryUuid
                ? {
                      connect: {
                          uuid: categoryUuid,
                      },
                  }
                : {};
            return await this.databaseService.raw.update({
                where: {
                    uuid,
                },
                data: {
                    title,
                    description,
                    price,
                    category: connect,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async remove(uuid: string): Promise<Raw> {
        try {
            return await this.databaseService.raw.delete({
                where: {
                    uuid,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }
}

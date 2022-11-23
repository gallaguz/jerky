import { Prisma } from '@prisma/client/scripts/catalog-client';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { ConfigService } from '@nestjs/config';
import { OrderBy } from '@jerky/enums';

export interface IBaseRepository<T> {
    create: (props: any) => Promise<T>;
    findFiltered: (props: any) => Promise<T[]>;
    findOne: (props: any) => Promise<T | null>;
    update: (props: any) => Promise<T>;
    remove: (props: any) => Promise<T>;
}

// TODO Need Service QueryBuilder instead this...

export abstract class RepositoryHelper {
    protected constructor(private readonly configService: ConfigService) {}

    public or(
        searchString?: string,
    ): { OR: { title: { contains: string } }[] } | { OR?: undefined } {
        return searchString
            ? {
                  OR: [{ title: { contains: searchString } }],
              }
            : {};
    }

    public take(take?: number): number {
        return Number(take) || Number(this.configService.get('TAKE_DEFAULT'));
    }

    public skip(skip?: number): number | undefined {
        return Number(skip) || undefined;
    }

    public orderBy(orderBy?: OrderBy): {
        title: OrderBy | 'asc' | 'desc' | undefined;
    } {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }

    public handleError(error: unknown): void {
        if (error instanceof Error) console.log(error.message);

        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new BadRequestException();
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') throw new ConflictException();
        }
        throw new BadRequestException(SOMETHING_WENT_WRONG);
    }
}

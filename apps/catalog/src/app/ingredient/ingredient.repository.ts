import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IngredientEntity } from './ingredient.entity';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import { FindFiltered } from '@jerky/contracts';

@Injectable()
export class IngredientRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly configService: ConfigService,
    ) {}

    public async create({
        uuid,
        title,
        price,
        description,
    }: IngredientEntity): Promise<Ingredient> {
        try {
            return await this.databaseService.ingredient.create({
                data: {
                    uuid,
                    title,
                    price,
                    description,
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
    }: FindFiltered): Promise<Ingredient[]> {
        try {
            const or = searchString
                ? {
                      OR: [{ title: { contains: searchString } }],
                  }
                : {};
            return await this.databaseService.ingredient.findMany({
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

    public async findOne(uuid: string): Promise<Ingredient | null> {
        try {
            return await this.databaseService.ingredient.findUnique({
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
        price,
        description,
    }: IngredientEntity): Promise<Ingredient> {
        try {
            return await this.databaseService.ingredient.update({
                where: {
                    uuid,
                },
                data: {
                    title,
                    price,
                    description,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                if (e.message.includes('Record to update not found'))
                    throw new NotFoundException();
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async remove(uuid: string): Promise<Ingredient> {
        try {
            return this.databaseService.ingredient.delete({
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

import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Category, Prisma } from '@prisma/client/scripts/catalog-client';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { FindFiltered } from '@jerky/contracts';
import { ICategoryEntity } from '@jerky/interfaces';
import { IBaseRepository, RepositoryHelper } from '../common/base.repository';

@Injectable()
export class CategoryRepository
    extends RepositoryHelper
    implements IBaseRepository<Category>
{
    constructor(
        private readonly databaseService: DatabaseService,
        configService: ConfigService,
    ) {
        super(configService);
    }

    public async create({
        uuid,
        title,
        description,
    }: ICategoryEntity): Promise<Category> {
        try {
            return await this.databaseService.category.create({
                data: {
                    uuid,
                    title,
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
    }: FindFiltered): Promise<Category[]> {
        return await this.databaseService.category
            .findMany({
                where: this.or(searchString),
                take: this.take(take),
                skip: this.skip(skip),
                orderBy: this.orderBy(orderBy),
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOne(uuid: string): Promise<Category | null> {
        try {
            return await this.databaseService.category.findUnique({
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
    }: ICategoryEntity): Promise<Category> {
        try {
            return await this.databaseService.category.update({
                where: {
                    uuid,
                },
                data: {
                    title,
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

    public async remove(uuid: string): Promise<Category> {
        try {
            return await this.databaseService.category.delete({
                where: {
                    uuid,
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                if (e.message.includes('Record to delete does not exist')) {
                    throw new NotFoundException();
                }
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }
}

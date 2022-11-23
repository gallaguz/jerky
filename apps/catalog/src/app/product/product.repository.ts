import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { IProductEntity } from '@jerky/interfaces';
import { Prisma } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;

@Injectable()
export class ProductRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly configService: ConfigService,
    ) {}

    public async create({ uuid, title, price, description }: IProductEntity) {
        try {
            // return await this.databaseService.product.create({
            //     data: {
            //         uuid,
            //         title,
            //         price,
            //         description,
            //     },
            // });
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
}

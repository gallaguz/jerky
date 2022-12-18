import { Prisma } from '@prisma/client/scripts/catalog-client';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
// import { ConfigService } from '@nestjs/config';
// import { DatabaseService } from '../database/database.service';

@Injectable()
export abstract class BaseRepository {
    // private _models = {
    //     recipe: this.databaseService.recipe,
    //     recipeType: this.databaseService.recipeType,
    //     raw: this.databaseService.raw,
    //     product: this.databaseService.product,
    //     category: this.databaseService.category,
    //     ingredient: this.databaseService.ingredient,
    //     ingredientQty: this.databaseService.ingredientQty,
    // };

    protected constructor() {
        //
    } // private readonly configService: ConfigService, // protected readonly databaseService: DatabaseService,

    // public async createBase(
    //     props: CreateInput,
    //     modelKey: DatabaseModelsKey,
    // ): Promise<DatabaseModel> {
    //     return this._models[modelKey].create({
    //         data: props,
    //     });
    // }

    public handleError(error: unknown): void {
        if (error instanceof Error) {
            if (error.message.includes('Record to delete does not exist')) {
                throw new NotFoundException();
            }
            if (error.message.includes('Record to update not found'))
                throw new NotFoundException();
            if (error.message.includes('Unique constraint failed'))
                throw new ConflictException();
        }

        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new BadRequestException(error.message);
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') throw new ConflictException();
        }
    }
}

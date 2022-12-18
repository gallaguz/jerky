import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { IBaseRepository, BaseRepository } from '../common';
import RawCreateInput = Prisma.RawCreateInput;
import RawUpdateInput = Prisma.RawUpdateInput;
import RawFindManyArgs = Prisma.RawFindManyArgs;
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;

@Injectable()
export class RawRepository
    extends BaseRepository
    implements
        IBaseRepository<
            Raw,
            RawCreateInput,
            RawUpdateInput,
            RawFindManyArgs,
            RawWhereUniqueInput,
            RawWhereUniqueInput,
            RawWhereUniqueInput
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: RawCreateInput): Promise<Raw> {
        return await this.databaseService.raw
            .create({
                data: { ...props, price: 44 },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(props: RawFindManyArgs): Promise<Raw[]> {
        return await this.databaseService.raw.findMany(props).catch((error) => {
            this.handleError(error);
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        });
    }

    public async findOneUuid(props: RawWhereUniqueInput): Promise<Raw | null> {
        return await this.databaseService.raw
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(props: RawWhereUniqueInput): Promise<Raw | null> {
        return await this.databaseService.raw
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async update(uuid: string, props: RawUpdateInput): Promise<Raw> {
        return await this.databaseService.raw
            .update({
                where: {
                    uuid,
                },
                data: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async remove(props: RawWhereUniqueInput): Promise<Raw> {
        return await this.databaseService.raw
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}

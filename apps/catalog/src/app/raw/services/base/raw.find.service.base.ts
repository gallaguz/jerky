import {
    CategoryFindFilteredQueryContract,
    CategoryFindOneTitleQueryContract,
    CategoryFindOneUuidQueryContract,
    RawFindFilteredQueryContract,
    RawFindOneTitleQueryContract,
    RawFindOneUuidQueryContract,
} from '@jerky/contracts';
import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { BaseService } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFindServiceBase } from '../../../common';
import RawFindManyArgs = Prisma.RawFindManyArgs;
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;
import { RawRepository } from '../../raw.repository';
import { OrderBy } from '@jerky/enums';
import RawOrderByWithRelationInput = Prisma.RawOrderByWithRelationInput;
import RawWhereInput = Prisma.RawWhereInput;

@Injectable()
export abstract class RawFindServiceBase
    extends BaseService
    implements
        IFindServiceBase<
            Raw,
            RawFindFilteredQueryContract.Request,
            RawFindManyArgs,
            RawFindOneUuidQueryContract.Request,
            RawWhereUniqueInput,
            RawFindOneTitleQueryContract.Request,
            RawWhereUniqueInput
        >
{
    protected constructor(
        private readonly rawRepository: RawRepository,
        private readonly configService: ConfigService,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async findFilteredBase(
        props: CategoryFindFilteredQueryContract.Request,
    ): Promise<Raw[]> {
        const findFilteredInput: RawFindManyArgs =
            this.findFilteredQueryBase(props);
        return await this.rawRepository.findFiltered(findFilteredInput);
    }

    public async findOneUuidBase(
        props: CategoryFindOneUuidQueryContract.Request,
    ): Promise<Raw> {
        const findOneUuidInput: RawWhereUniqueInput =
            this.findOneUuidQueryBase(props);
        const existed = await this.rawRepository.findOneUuid(findOneUuidInput);
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findOneTitleBase(
        props: CategoryFindOneTitleQueryContract.Request,
    ): Promise<Raw> {
        const findOneTitleInput: RawWhereUniqueInput =
            this.findOneTitleQueryBase(props);
        const existed = await this.rawRepository.findOneTitle(
            findOneTitleInput,
        );
        if (!existed) throw new NotFoundException();
        return existed;
    }

    findFilteredQueryBase(
        props: RawFindFilteredQueryContract.Request,
    ): RawFindManyArgs {
        return {
            where: this.or(props.searchString),
            take: this.take(props.take),
            skip: this.skip(props.skip),
            orderBy: this.orderBy(props.orderBy),
        };
    }

    findOneUuidQueryBase(
        props: RawFindOneUuidQueryContract.Request,
    ): RawWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    findOneTitleQueryBase(
        props: RawFindOneTitleQueryContract.Request,
    ): RawWhereUniqueInput {
        return {
            title: props.title,
        };
    }

    public or(searchString?: string): RawWhereInput {
        return searchString
            ? {
                  OR: [
                      { title: { contains: searchString } },
                      { description: { contains: searchString } },
                  ],
              }
            : {};
    }

    public take(take?: number): number {
        return Number(take) || Number(this.configService.get('TAKE_DEFAULT'));
    }

    public skip(skip?: number): number | undefined {
        return Number(skip) || undefined;
    }

    public orderBy(orderBy?: OrderBy): RawOrderByWithRelationInput {
        return {
            title: orderBy || this.configService.get('ORDER_BY_DEFAULT'),
        };
    }
}

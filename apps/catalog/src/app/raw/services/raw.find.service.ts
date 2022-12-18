import {
    RawFindFilteredQueryContract,
    RawFindOneTitleQueryContract,
    RawFindOneUuidQueryContract,
    RecipeFindOneUuid,
} from '@jerky/contracts';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { Injectable } from '@nestjs/common';
import { RawFindServiceBase } from './base/raw.find.service.base';
import { IFindService } from '../../common';
import { RawRepository } from '../raw.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RawFindService
    extends RawFindServiceBase
    implements
        IFindService<
            Raw,
            RawFindFilteredQueryContract.Request,
            RecipeFindOneUuid.Request,
            RawFindOneTitleQueryContract.Request
        >
{
    constructor(
        rawRepository: RawRepository,
        rmqService: RMQService,
        configService: ConfigService,
    ) {
        super(rawRepository, configService, rmqService);
    }

    public async findFiltered(
        props: RawFindFilteredQueryContract.Request,
    ): Promise<Raw[]> {
        return await this.findFilteredBase(props);
    }

    public async findOneUuid(
        props: RawFindOneUuidQueryContract.Request,
    ): Promise<Raw> {
        return await this.findOneUuidBase(props);
    }

    public async findOneTitle(
        props: RawFindOneTitleQueryContract.Request,
    ): Promise<Raw> {
        return await this.findOneTitleBase(props);
    }
}

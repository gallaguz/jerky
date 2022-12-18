import { Injectable } from '@nestjs/common';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RawUpdateCommandContract } from '@jerky/contracts';
import { RawUpdateServiceBase } from './base/raw.update.service.base';
import { IUpdateService } from '../../common';
import { RawRepository } from '../raw.repository';

@Injectable()
export class RawUpdateService
    extends RawUpdateServiceBase
    implements IUpdateService<RawUpdateCommandContract.Request, Raw>
{
    constructor(rawRepository: RawRepository, rmqService: RMQService) {
        super(rawRepository, rmqService);
    }

    public async update(props: RawUpdateCommandContract.Request): Promise<Raw> {
        return await this.updateBase(props);
    }
}

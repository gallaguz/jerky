import { Raw } from '@prisma/client/scripts/catalog-client';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { RawRemoveCommandContract } from '@jerky/contracts';
import { IRemoveService } from '../../common';
import { RawRepository } from '../raw.repository';
import { RawRemoveServiceBase } from './base/raw.remove.service.base';

@Injectable()
export class RawRemoveService
    extends RawRemoveServiceBase
    implements IRemoveService<RawRemoveCommandContract.Request, Raw>
{
    constructor(rawRepository: RawRepository, rmqService: RMQService) {
        super(rawRepository, rmqService);
    }

    public async remove(props: RawRemoveCommandContract.Request): Promise<Raw> {
        return await this.removeBase(props);
    }
}

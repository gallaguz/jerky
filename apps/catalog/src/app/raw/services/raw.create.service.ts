import { Injectable } from '@nestjs/common';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { RMQService } from 'nestjs-rmq';
import { RawCreateCommandContract } from '@jerky/contracts';
import { RawRepository } from '../raw.repository';
import { RawCreateServiceBase } from './base/raw.create.service.base';

@Injectable()
export class RawCreateService extends RawCreateServiceBase {
    constructor(rawRepository: RawRepository, rmqService: RMQService) {
        super(rawRepository, rmqService);
    }

    public async create(props: RawCreateCommandContract.Request): Promise<Raw> {
        return await this.createBase(props);
    }
}

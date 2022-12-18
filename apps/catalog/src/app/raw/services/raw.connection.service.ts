import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RawConnectionsCommandContract } from '@jerky/contracts';
import { RawRepository } from '../raw.repository';
import RawUpdateInput = Prisma.RawUpdateInput;
import { RawUpdateServiceBase } from './base/raw.update.service.base';
import { RMQService } from 'nestjs-rmq';
import { IConnectionService } from '../../common';

@Injectable()
export class RawConnectionService
    extends RawUpdateServiceBase
    implements
        IConnectionService<
            RawConnectionsCommandContract.Request,
            Raw,
            RawUpdateInput
        >
{
    constructor(rawRepository: RawRepository, rmqService: RMQService) {
        super(rawRepository, rmqService);
    }

    public async updateConnection(
        props: RawConnectionsCommandContract.Request,
    ): Promise<Raw> {
        const existed: Raw | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const connectInput: RawUpdateInput = this.updateConnectionQuery(props);
        return this.rawRepository.update(props.uuid, connectInput);
    }

    public updateConnectionQuery(
        props: RawConnectionsCommandContract.Request,
    ): RawUpdateInput {
        return {
            [props.model]: {
                [props.action]: {
                    uuid: props.targetUuid,
                },
            },
        };
    }
}

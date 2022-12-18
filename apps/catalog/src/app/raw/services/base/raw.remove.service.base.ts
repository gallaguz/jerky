import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, IRemoveServiceBase } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { RawRemoveCommandContract } from '@jerky/contracts';
import { RawRepository } from '../../raw.repository';
import { RawEntity } from '../../raw.entity';
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;

@Injectable()
export abstract class RawRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            RawRemoveCommandContract.Request,
            Raw,
            RawEntity,
            RawWhereUniqueInput
        >
{
    protected constructor(
        private readonly rawRepository: RawRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(
        props: RawRemoveCommandContract.Request,
    ): Promise<Raw> {
        const removeInput: RawWhereUniqueInput = this.removeQueryBase(props);
        const removed = await this.rawRepository.remove(removeInput);
        if (!removed) throw new NotFoundException();

        const entity = new RawEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    public removeQueryBase(
        props: RawRemoveCommandContract.Request,
    ): RawWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: RawEntity,
        removed: Raw,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}

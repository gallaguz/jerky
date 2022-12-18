import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { BaseService, IUpdateServiceBase } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { RawUpdateCommandContract } from '@jerky/contracts';
import { RawRepository } from '../../raw.repository';
import { RawEntity } from '../../raw.entity';
import RawUpdateInput = Prisma.RawUpdateInput;
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;

@Injectable()
export abstract class RawUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            RawUpdateCommandContract.Request,
            Raw,
            RawEntity,
            RawUpdateInput,
            string
        >
{
    protected constructor(
        protected readonly rawRepository: RawRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(
        props: RawUpdateCommandContract.Request,
    ): Promise<Raw> {
        const existed: Raw | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: RawEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: RawUpdateInput = this.updateQueryBase(entity);
        const updated: Raw = await this.rawRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: RawEntity): RawUpdateInput {
        return {
            title: entity.title,
            description: entity.description,
        };
    }

    public createEntityBase(
        props: RawUpdateCommandContract.Request,
    ): RawEntity {
        return new RawEntity(props);
    }

    public async isExistBase(uuid: string): Promise<Raw | null> {
        const findOneUuidInput: RawWhereUniqueInput = { uuid };
        return await this.rawRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: RawEntity,
        existed: Raw,
        updated: Raw,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}

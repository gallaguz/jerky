import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Prisma, Raw } from '@prisma/client/scripts/catalog-client';
import { BaseService } from '../../../common';
import { RMQService } from 'nestjs-rmq';
import { RawCreateCommandContract } from '@jerky/contracts';
import { RawRepository } from '../../raw.repository';
import { RawEntity } from '../../raw.entity';
import { ICreateServiceBase } from '../../../common';
import RawCreateInput = Prisma.RawCreateInput;
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;
import { IRawCreate } from '@jerky/interfaces';

@Injectable()
export abstract class RawCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            RawCreateCommandContract.Request,
            Raw,
            RawEntity,
            RawCreateInput,
            string
        >
{
    protected constructor(
        private readonly rawRepository: RawRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(
        props: RawCreateCommandContract.Request,
    ): Promise<Raw> {
        const existed: Raw | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity = this.createEntityBase(props);
        const createInput: RawCreateInput = this.createQueryBase(entity);

        const created = await this.rawRepository.create(createInput);
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    createQueryBase(entity: RawEntity): RawCreateInput {
        return {
            uuid: entity.uuid,
            title: entity.title,
            price: entity.price,
            description: entity.description,
        };
    }

    public createEntityBase(
        props: RawCreateCommandContract.Request,
    ): RawEntity {
        const entityProps: IRawCreate = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
            price: props.price,
        };
        return new RawEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<Raw | null> {
        const findOneTitleInput: RawWhereUniqueInput = { title };
        return await this.rawRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: RawEntity,
        created: Raw,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}

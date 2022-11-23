import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RawRepository } from './raw.repository';
import { BaseService, IBaseService } from '../common/base.service';
import { RawEntity } from './raw.entity';
import { RMQService } from 'nestjs-rmq';
import {
    RawCreate,
    RawFindFiltered,
    RawFindOne,
    RawRemove,
    RawUpdate,
} from '@jerky/contracts';

@Injectable()
export class RawService extends BaseService implements IBaseService<RawEntity> {
    constructor(
        private readonly rawRepository: RawRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async create(props: RawCreate.Request): Promise<RawEntity> {
        const existedRaw = await this.rawRepository.findFiltered({
            searchString: props.title,
        });
        if (existedRaw) throw new ConflictException();

        const rawEntity = new RawEntity(undefined, props);

        const createdRaw = await this.rawRepository.create(rawEntity);
        if (!createdRaw) throw new BadRequestException();

        rawEntity.createEvent(props);
        await this.handle(rawEntity);

        const { uuid, ...rest } = rawEntity;
        return new RawEntity(uuid, rest);
    }

    public async findFiltered(
        props: RawFindFiltered.Request,
    ): Promise<RawEntity[]> {
        const existedRaws = await this.rawRepository.findFiltered(props);

        return existedRaws.map(
            ({ uuid, ...rest }) => new RawEntity(uuid, rest),
        );
    }

    public async findOne(props: RawFindOne.Request): Promise<RawEntity> {
        const existedRaw = await this.rawRepository.findOne(props.uuid);
        if (!existedRaw) throw new NotFoundException();
        const { uuid, ...rest } = existedRaw;
        return new RawEntity(uuid, rest);
    }

    public async update(props: RawUpdate.Request): Promise<RawEntity> {
        const existedRaw = await this.rawRepository.findOne(props.uuid);
        if (!existedRaw) throw new ConflictException();

        const rawEntity = new RawEntity(existedRaw.uuid);
        rawEntity.update(props);

        const { uuid, ...rest } = await this.rawRepository.update(rawEntity);

        rawEntity.updateEvent(props);
        await this.handle(rawEntity);

        return new RawEntity(uuid, rest);
    }

    public async remove(props: RawRemove.Request): Promise<RawEntity> {
        const deletedRaw = await this.rawRepository.remove(props.uuid);
        if (!deletedRaw) throw new NotFoundException();
        const { uuid, ...rest } = deletedRaw;
        const rawEntity = new RawEntity(uuid, rest);

        rawEntity.removeEvent();
        await this.handle(rawEntity);

        return rawEntity;
    }
}

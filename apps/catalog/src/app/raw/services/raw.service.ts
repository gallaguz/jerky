import { Injectable } from '@nestjs/common';
import {
    RawCreateCommandContract,
    RawFindFilteredQueryContract,
    RawFindOneUuidQueryContract,
    RawFindOneTitleQueryContract,
    RawUpdateCommandContract,
    RawRemoveCommandContract,
    RecipeFindOneUuid,
    RawConnectionsCommandContract,
} from '@jerky/contracts';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { RawCreateService } from './raw.create.service';
import { RawUpdateService } from './raw.update.service';
import { RawRemoveService } from './raw.remove.service';
import { RawFindService } from './raw.find.service';
import { IBaseService } from '../../common';
import { RawConnectionService } from './raw.connection.service';

@Injectable()
export class RawService
    implements
        IBaseService<
            Raw,
            RawCreateCommandContract.Request,
            RawFindFilteredQueryContract.Request,
            RawFindOneUuidQueryContract.Request,
            RawFindOneTitleQueryContract.Request,
            RawUpdateCommandContract.Request,
            RawRemoveCommandContract.Request,
            RawConnectionsCommandContract.Request
        >
{
    constructor(
        private readonly rawCreateService: RawCreateService,
        private readonly rawUpdateService: RawUpdateService,
        private readonly rawRemoveService: RawRemoveService,
        private readonly rawFindService: RawFindService,
        private readonly rawConnectionService: RawConnectionService,
    ) {}

    public async create(props: RawCreateCommandContract.Request): Promise<Raw> {
        return await this.rawCreateService.create(props);
    }

    public async findFiltered(
        props: RawFindFilteredQueryContract.Request,
    ): Promise<Raw[]> {
        return await this.rawFindService.findFiltered(props);
    }

    public async findOneUuid(props: RecipeFindOneUuid.Request): Promise<Raw> {
        return await this.rawFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: RawFindOneTitleQueryContract.Request,
    ): Promise<Raw> {
        return await this.rawFindService.findOneTitle(props);
    }

    public async update(props: RawUpdateCommandContract.Request): Promise<Raw> {
        return await this.rawUpdateService.update(props);
    }

    public async remove(props: RawRemoveCommandContract.Request): Promise<Raw> {
        return this.rawRemoveService.remove(props);
    }

    public async updateConnection(
        props: RawConnectionsCommandContract.Request,
    ): Promise<Raw> {
        return this.rawConnectionService.updateConnection(props);
    }
}

import { Body, Controller } from '@nestjs/common';
import { RawService } from './services/raw.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    RawConnectionsCommandContract,
    RawCreateCommandContract,
    RawFindFilteredQueryContract,
    RawFindOneUuidQueryContract,
    RawRemoveCommandContract,
    RawUpdateCommandContract,
} from '@jerky/contracts';

@Controller('')
export class RawController {
    constructor(private readonly rawService: RawService) {}

    @RMQValidate()
    @RMQRoute(RawCreateCommandContract.topic)
    public async create(
        @Body() props: RawCreateCommandContract.Request,
    ): Promise<RawCreateCommandContract.Response> {
        return await this.rawService.create(props);
    }

    @RMQValidate()
    @RMQRoute(RawFindFilteredQueryContract.topic)
    public async findFiltered(
        @Body() props: RawFindFilteredQueryContract.Request,
    ): Promise<RawFindFilteredQueryContract.Response> {
        return await this.rawService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(RawFindOneUuidQueryContract.topic)
    public async findOne(
        @Body() props: RawFindOneUuidQueryContract.Request,
    ): Promise<RawFindOneUuidQueryContract.Response> {
        return await this.rawService.findOneUuid(props);
    }

    @RMQValidate()
    @RMQRoute(RawUpdateCommandContract.topic)
    public async update(
        @Body() props: RawUpdateCommandContract.Request,
    ): Promise<RawUpdateCommandContract.Response> {
        return await this.rawService.update(props);
    }

    @RMQValidate()
    @RMQRoute(RawRemoveCommandContract.topic)
    public async remove(
        @Body() props: RawRemoveCommandContract.Request,
    ): Promise<RawRemoveCommandContract.Response> {
        return await this.rawService.remove(props);
    }

    @RMQValidate()
    @RMQRoute(RawConnectionsCommandContract.topic)
    public async updateConnection(
        props: RawConnectionsCommandContract.Request,
    ): Promise<RawConnectionsCommandContract.Response> {
        return await this.rawService.updateConnection(props);
    }
}

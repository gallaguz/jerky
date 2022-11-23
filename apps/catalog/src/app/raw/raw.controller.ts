import { Body, Controller } from '@nestjs/common';
import { RawService } from './raw.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    RawCreate,
    RawFindFiltered,
    RawFindOne,
    RawRemove,
    RawUpdate,
} from '@jerky/contracts';

@Controller('')
export class RawController {
    constructor(private readonly rawService: RawService) {}

    @RMQValidate()
    @RMQRoute(RawCreate.topic)
    public async create(
        @Body() props: RawCreate.Request,
    ): Promise<RawCreate.Response> {
        return await this.rawService.create(props);
    }

    @RMQValidate()
    @RMQRoute(RawFindFiltered.topic)
    public async findFiltered(
        @Body() props: RawFindFiltered.Request,
    ): Promise<RawFindFiltered.Response> {
        return await this.rawService.findFiltered(props);
    }

    @RMQValidate()
    @RMQRoute(RawFindOne.topic)
    public async findOne(
        @Body() props: RawFindOne.Request,
    ): Promise<RawFindOne.Response> {
        return await this.rawService.findOne(props);
    }

    @RMQValidate()
    @RMQRoute(RawUpdate.topic)
    public async update(
        @Body() props: RawUpdate.Request,
    ): Promise<RawUpdate.Response> {
        return await this.rawService.update(props);
    }

    @RMQValidate()
    @RMQRoute(RawRemove.topic)
    public async remove(
        @Body() props: RawRemove.Request,
    ): Promise<RawRemove.Response> {
        return await this.rawService.remove(props);
    }
}

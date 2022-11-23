import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { RawService } from './raw.service';

@Controller('raw')
export class RawController {
    constructor(private readonly rawService: RawService) {}

    // @UsePipes(new ValidationPipe())
    // @Post()
    // public async create(@Body() dto) {
    //     return this.rawService.create(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Post('find')
    // public async findFiltered(@Body() dto) {
    //     return this.rawService.findFiltered(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Get(':uuid')
    // public async findOne(@Param() dto) {
    //     return this.rawService.findOne(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Patch()
    // public async update(@Body() dto) {
    //     return this.rawService.update(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Delete(':uuid')
    // public async remove(@Param() dto) {
    //     return this.rawService.remove(dto);
    // }
}

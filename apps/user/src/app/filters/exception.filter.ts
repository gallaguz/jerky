import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        // TODO

        const response = ctx.getResponse<Response>();

        response.status(404).json({
            status: 404,
            message: 'No such file or directory',
        });
    }
}

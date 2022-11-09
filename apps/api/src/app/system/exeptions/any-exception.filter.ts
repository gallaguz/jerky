import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status: HttpStatus = exception.status ?? HttpStatus.BAD_REQUEST;
        const message = exception.message ?? 'Bad request';

        // if (message.includes('Unexpected token')) {
        //     response.status(status).json({
        //         statusCode: status,
        //         message: 'Bad request',
        //         timestamp: new Date().toISOString(),
        //     });
        // } else {
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
        // }
    }
}

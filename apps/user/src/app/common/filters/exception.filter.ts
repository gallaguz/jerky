import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status: HttpStatus = exception.status ?? HttpStatus.BAD_REQUEST;
        const message = exception.message ?? 'Bad request';

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}

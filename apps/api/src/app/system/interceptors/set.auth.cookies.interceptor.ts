import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ITokens } from '@jerky/interfaces';

@Injectable()
export class SetAuthCookiesInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ITokens> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            tap((data: ITokens) => {
                Logger.verbose(response.data);
                response.cookie('refreshToken', data.refreshToken, {
                    expires: new Date(new Date().getTime() + 30 * 1000),
                    sameSite: 'strict',
                    httpOnly: true,
                });
            }),
        );
    }
}

import { TTokens } from '@jerky/interfaces';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UnsetAuthCookiesInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<TTokens> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            tap((data: TTokens) => {
                response.cookie('refreshToken', data.refreshToken, {
                    expires: -1,
                    sameSite: 'strict',
                    httpOnly: true,
                });
            }),
        );
    }
}

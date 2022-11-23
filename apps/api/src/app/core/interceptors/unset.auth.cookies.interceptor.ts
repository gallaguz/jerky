import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ITokens } from '@jerky/interfaces';

@Injectable()
export class UnsetAuthCookiesInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ITokens> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            tap((data: ITokens) => {
                response.cookie('refreshToken', data.refreshToken, {
                    expires: -1,
                    sameSite: 'strict',
                    httpOnly: true,
                });
            }),
        );
    }
}

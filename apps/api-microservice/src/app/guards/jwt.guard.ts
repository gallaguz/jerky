import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtGuard extends AuthGuard('JwtStrategy') {
    private readonly roles: string[] = [];

    constructor(roles?: string[]) {
        super();
        if (roles) {
            this.roles = roles;
        }
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<ITokenPayload>(
        _err: unknown,
        user: { uuid: string; role: string },
    ): ITokenPayload {
        if (!user) throw new UnauthorizedException();

        if (!!this.roles.length && !this.roles.includes(user.role))
            throw new UnauthorizedException();

        return <ITokenPayload>user;
    }
}

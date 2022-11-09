import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client/scripts/user-client';

export class JwtGuard extends AuthGuard('JwtStrategy') {
    private readonly roles: Role[] = [];

    constructor(roles?: Role[]) {
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
        err: unknown,
        user: { uuid: string; role: Role },
    ): ITokenPayload {
        if (!user) throw new UnauthorizedException();

        if (!!this.roles.length && !this.roles.includes(user.role))
            throw new UnauthorizedException();

        return <ITokenPayload>user;
    }
}

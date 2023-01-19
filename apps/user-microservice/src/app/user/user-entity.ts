import {
    InternalUserCreateCommandContract,
    InternalUserRemoveCommandContract,
    InternalUserUpdateCommandContract,
} from '@jerky/contracts';
import { TEntityBase, TUser, TUserUpdate } from '@jerky/interfaces';
import { User } from '@prisma/client/scripts/user-client';

import { UserEntityBase } from '../../common/base-entity';

export class UserEntity
    extends UserEntityBase
    implements TEntityBase<User, TUser>
{
    constructor(props: TUser) {
        super(props);

        return this;
    }

    public update(props: TUserUpdate): UserEntity {
        this.updateBase(props);

        return this;
    }
    public createEvent(created: User, props: unknown): void {
        this.publishEvent(InternalUserCreateCommandContract.topic, {
            created,
            props,
        });
    }
    public updateEvent(existed: User, updated: User, props: unknown): void {
        this.publishEvent(InternalUserUpdateCommandContract.topic, {
            existed,
            updated,
            props,
        });
    }
    public removeEvent(removed: User, props: unknown): void {
        this.publishEvent(InternalUserRemoveCommandContract.topic, {
            removed,
            props,
        });
    }
}

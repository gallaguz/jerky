import {
    InternalRawTypeCreateEventContract,
    InternalRawTypeRemoveEventContract,
    InternalRawTypeUpdateEventContract,
} from '@jerky/contracts';
import { TEntityBase, TRawType, TRawTypeUpdate } from '@jerky/interfaces';
import { RawType } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogRawTypeEntity
    extends CatalogEntityBase
    implements TEntityBase<RawType, TRawType>
{
    constructor(props: TRawType) {
        super(props);

        return this;
    }
    public update(props: TRawTypeUpdate): CatalogRawTypeEntity {
        this.updateBase(props);

        return this;
    }
    public createEvent(created: RawType, props: unknown): void {
        this.publishEvent(InternalRawTypeCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(
        existed: RawType,
        updated: RawType,
        props: unknown,
    ): void {
        this.publishEvent(InternalRawTypeUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }
    public removeEvent(removed: RawType, props: unknown): void {
        this.publishEvent(InternalRawTypeRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}

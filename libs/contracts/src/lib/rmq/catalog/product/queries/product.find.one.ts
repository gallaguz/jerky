import { FindOne } from '../../../../common';
import { IProductEntity } from '@jerky/interfaces';

export namespace ProductFindOne {
    export const topic = 'catalog.product-find-one.query';

    export class Request extends FindOne {}

    export type Response = IProductEntity;
}

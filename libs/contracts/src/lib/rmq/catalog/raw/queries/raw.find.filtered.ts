import { FindFiltered } from '../../../../common';
import { IRawEntity } from '@jerky/interfaces';

export namespace RawFindFiltered {
    export const topic = 'catalog.raw-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = IRawEntity[];
}

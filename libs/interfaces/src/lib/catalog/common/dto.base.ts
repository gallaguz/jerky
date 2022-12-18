import { OrderBy } from '@jerky/enums';

type Uuid = { uuid: string };
type Connect = { connect: Uuid };
type Disconnect = { connect: Uuid };

export type IDtoBase = {
    uuid: string;
    title: string;
    description: string;
};
export type CreateBase = MakeOptional<Omit<IDtoBase, 'uuid'>, 'description'>;
export type UpdateBase = MakeOptional<IDtoBase, 'title' | 'description'>;
export type RemoveBase = Pick<IDtoBase, 'uuid'>;
export type FindOneUuidBase = Pick<IDtoBase, 'uuid'>;
export type FindOneTitleBase = Pick<IDtoBase, 'title'>;
export type FindManyBase = {
    take?: number;
    skip?: number;
    orderBy?: OrderBy;
    searchString?: string;
};
export type ConnectBase = Connect;
export type DisconnectBase = Disconnect;

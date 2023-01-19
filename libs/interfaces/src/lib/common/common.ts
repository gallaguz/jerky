import { IDomainEvent } from '../domain';

export type TModelBase = {
    uuid?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
};

export interface TEntityBase<Model, TModel> {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    events: IDomainEvent[];
    update(props: TModel): TEntityBase<Model, TModel>;
    createEvent(model: Model, props: unknown): void;
    updateEvent(existed: Model, updated: Model, props: unknown): void;
    removeEvent(model: Model, props: unknown): void;
}

export interface IBaseRepository<
    Model,
    CreateData,
    UpdateArgs,
    FindFilteredProps,
    FindOneProps,
    RemoveProps,
> {
    create(data: CreateData): Promise<Model>;
    findMany(data: FindFilteredProps): Promise<Model[]>;
    findOne(props: FindOneProps): Promise<Model | null>;
    update(props: UpdateArgs): Promise<Model>;
    remove(props: RemoveProps): Promise<Model>;
}

export interface IBaseService<
    Model,
    CreateProps,
    UpdateProps,
    RemoveProps,
    FindManyProps,
    FindOneProps,
> {
    create(props: CreateProps): Promise<Model>;
    update(props: UpdateProps): Promise<Model>;
    remove(props: RemoveProps): Promise<Model>;
    findMany(props: FindManyProps): Promise<Model[]>;
    findOne(props: FindOneProps): Promise<Model>;
}

export interface IController<Model> {
    create(props: unknown): Promise<Model>;
    findMany(props: unknown): Promise<Model[]>;
    findOne(props: unknown): Promise<Model | null>;
    update(props: unknown): Promise<Model>;
    remove(props: unknown): Promise<Model>;
}

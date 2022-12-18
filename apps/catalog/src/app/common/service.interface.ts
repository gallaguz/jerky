export interface IBaseService<
    Model,
    Create,
    FindFiltered,
    FindOneUuid,
    FindOneTitle,
    Update,
    Remove,
    UpdateConnection,
> {
    create: (props: Create) => Promise<Model>;
    findFiltered: (props: FindFiltered) => Promise<Model[]>;
    findOneUuid: (props: FindOneUuid) => Promise<Model>;
    findOneTitle: (props: FindOneTitle) => Promise<Model>;
    update: (props: Update) => Promise<Model>;
    remove: (props: Remove) => Promise<Model>;
    updateConnection?: (props: UpdateConnection) => Promise<Model>;
}

export interface ICreateServiceBase<
    Props,
    Model,
    Entity,
    CreateInput,
    FindOneProps,
> {
    createBase(props: Props): Promise<Model>;
    createQueryBase(entity: Entity): CreateInput;
    createEntityBase(props: Props): Entity;
    isExistBase(props: FindOneProps): Promise<Model | null>;
    emitCreateEventBase(entity: Entity, created: Model): Promise<void>;
}

export interface IUpdateServiceBase<
    Props,
    Model,
    Entity,
    UpdateInput,
    FindOneProps,
> {
    updateBase(props: Props): Promise<Model>;
    updateQueryBase(entity: Entity): UpdateInput;
    createEntityBase(props: Props): Entity;
    isExistBase(props: FindOneProps): Promise<Model | null>;
    emitUpdateEventBase(
        entity: Entity,
        existed: Model,
        updated: Model,
    ): Promise<void>;
}

export interface IFindServiceBase<
    Model,
    FindFilteredProps,
    FindFilteredInput,
    FindOneUuidProps,
    FindOneUuidInput,
    FindOneTitleProps,
    FindOneTitleInput,
> {
    findFilteredBase(props: FindFilteredProps): Promise<Model[]>;
    findOneUuidBase(props: FindOneUuidProps): Promise<Model>;
    findOneTitleBase(props: FindOneTitleProps): Promise<Model>;
    findFilteredQueryBase(props: FindFilteredProps): FindFilteredInput;
    findOneUuidQueryBase(props: FindOneUuidProps): FindOneUuidInput;
    findOneTitleQueryBase(props: FindOneTitleProps): FindOneTitleInput;
}

export interface IRemoveServiceBase<Props, Model, Entity, RemoveInput> {
    removeBase(props: Props): Promise<Model>;
    removeQueryBase(props: Props): RemoveInput;
    emitRemoveEventBase(entity: Entity, removed: Model): Promise<void>;
}

export interface ICreateService<Props, Model> {
    create(props: Props): Promise<Model>;
}

export interface IUpdateService<Props, Model> {
    update(props: Props): Promise<Model>;
}

export interface IRemoveService<Props, Model> {
    remove(props: Props): Promise<Model>;
}

export interface IFindService<
    Model,
    FindFilteredProps,
    FindOneUuidProps,
    FindOneTitleProps,
> {
    findFiltered(props: FindFilteredProps): Promise<Model[]>;
    findOneUuid(props: FindOneUuidProps): Promise<Model>;
    findOneTitle(props: FindOneTitleProps): Promise<Model>;
}

export interface IConnectionService<Props, Model, UpdateInput> {
    updateConnection(props: Props): Promise<Model>;
    updateConnectionQuery(props: Props): UpdateInput;
}

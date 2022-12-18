export interface IBaseRepository<
    Model,
    CreateProps,
    UpdateProps,
    FindFilteredProps,
    FindOneUuidProps,
    FindOneTitleProps,
    RemoveProps,
> {
    create: (props: CreateProps) => Promise<Model>;
    findFiltered: (props: FindFilteredProps) => Promise<Model[]>;
    findOneUuid: (props: FindOneUuidProps) => Promise<Model | null>;
    findOneTitle: (props: FindOneTitleProps) => Promise<Model | null>;
    update: (uuid: string, props: UpdateProps) => Promise<Model>;
    remove: (props: RemoveProps) => Promise<Model>;
}

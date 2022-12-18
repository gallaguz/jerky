export interface IController<T> {
    create: (props: any) => Promise<T>;
    findFiltered: (props: any) => Promise<T[]>;
    findOneUuid: (props: any) => Promise<T | null>;
    findOneTitle: (props: any) => Promise<T | null>;
    update: (props: any) => Promise<T>;
    remove: (props: any) => Promise<T>;
}

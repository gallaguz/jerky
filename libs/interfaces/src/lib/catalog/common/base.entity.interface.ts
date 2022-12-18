export interface IBaseEntity<Model, Props> {
    update(props: Props): void;
    createEvent(model: Model): void;
    updateEvent(existed: Model, updated: Model): void;
    removeEvent(model: Model): void;
}

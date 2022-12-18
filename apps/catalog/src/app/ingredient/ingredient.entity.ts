import {
    IIngredientEntity,
    IIngredientCreate,
    IIngredientUpdate,
} from '@jerky/interfaces';
import {
    IngredientCreateEvent,
    IngredientRemoveEvent,
    IngredientUpdateEvent,
} from '@jerky/contracts';
import { BaseEntity } from '../common';
import {
    Ingredient,
    IngredientForm,
} from '@prisma/client/scripts/catalog-client';

export class IngredientEntity extends BaseEntity implements IIngredientEntity {
    private _price: number;
    private _form: IngredientForm;
    // private _ingredientQtyConnection: IIngredientQtyConnection;

    constructor(props: IIngredientCreate) {
        super(props.uuid, props.title, props.description);

        if (props.price) this.setPrice(props.price);
        if (props.form) this.setForm(props.form);
        // if (props.ingredientQtyConnection)
        //     this.setIngredientQtyConnection(props.ingredientQtyConnection);

        return this;
    }

    get price(): number {
        return this._price;
    }

    get form(): IngredientForm {
        return this._form;
    }

    // get ingredientQtyConnection(): IIngredientQtyConnection {
    //     return this._ingredientQtyConnection;
    // }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public setForm(newForm: IngredientForm): void {
        this._form = newForm;
    }

    // public setIngredientQtyConnection(
    //     ingredientQtyConnection: IIngredientQtyConnection,
    // ): void {
    //     this._ingredientQtyConnection = ingredientQtyConnection;
    // }

    public update(props: IIngredientUpdate): void {
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
        if (props.price) this.setPrice(props.price);
        if (props.form) this.setForm(props.form);
        // if (props.ingredientQtyConnection)
        //     this.setIngredientQtyConnection(props.ingredientQtyConnection);
    }

    public createEvent(newIngredient: Ingredient): void {
        this.publishEvent(IngredientCreateEvent.topic, newIngredient);
    }

    public updateEvent(existed: Ingredient, updated: Ingredient): void {
        this.publishEvent(IngredientUpdateEvent.topic, {
            existed,
            updated,
        });
    }

    public removeEvent(ingredient: Ingredient): void {
        this.publishEvent(IngredientRemoveEvent.topic, ingredient);
    }
}

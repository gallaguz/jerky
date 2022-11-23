import {
    Ingredient,
    PrismaClient,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

const prismaClient = new PrismaClient();

export interface IIngredient {
    uuid: string;
    title: string;
    form?: string;
    description: string;
    price: number;
}

const ingredients: IIngredient[] = [
    {
        uuid: crypto.randomUUID(),
        title: 'Salt',
        form: 'Sand',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Salt Nitrite',
        form: 'Sand',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Red Hot Paper',
        form: 'Powder',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Red Hot Paper',
        form: 'Flakes',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Red Sweet Paper',
        form: 'Powder',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Black Paper',
        form: 'Powder',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Paprika',
        form: 'Powder',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Coriander',
        form: 'Split',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Soy Souse',
        form: 'Liquor',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Honey',
        form: 'Viscous',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Sugar',
        form: 'Sand',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Garlic',
        form: 'Powder',
        description: faker.commerce.productDescription(),
        price: Math.floor(Math.random() * 100),
    },
];

const saveIngredient = async ({
    uuid,
    description,
    form,
    title,
    price,
}: IIngredient): Promise<Ingredient> => {
    try {
        return await prismaClient.ingredient.create({
            data: {
                uuid,
                description,
                form,
                title,
                price,
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const main = async (): Promise<Ingredient[]> => {
    const createdIngredients: Ingredient[] = [];
    for (const ingredient of ingredients) {
        createdIngredients.push(await saveIngredient(ingredient));
    }
    return createdIngredients;
};

export const seedIngredients = async (): Promise<Ingredient[]> => {
    return main()
        .then(async (res) => {
            await prismaClient.$disconnect();
            // console.log(res);
            return res;
        })
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        });
};

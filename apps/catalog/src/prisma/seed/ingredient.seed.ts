import { faker } from '@faker-js/faker';
import {
    Ingredient,
    Prisma,
    PrismaClient,
} from '@prisma/client/scripts/catalog-client';

import { INGREDIENT_TYPES } from '../../../../../libs/constants/src/lib/ingredient-types';
import IngredientCreateInput = Prisma.IngredientCreateInput;
import * as slug from 'slug';

import { pickKey, pickNumberInRange } from './common/helper';

const prismaClient = new PrismaClient();

type TIngredientInput = {
    title: string;
    description: string;
    type: string;
    price: number;
    payload: number;
};

const ingredients: TIngredientInput[] = [
    {
        title: 'Salt',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Salt Nitrite',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Red Hot Paper',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Red Hot Paper',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Red Sweet Paper',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Black Paper',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Paprika',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Coriander',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Soy Souse',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Honey',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Sugar',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
    {
        title: 'Garlic',
        type: pickKey(INGREDIENT_TYPES),
        description: faker.commerce.productDescription(),
        price: pickNumberInRange(1, 100),
        payload: pickNumberInRange(50, 100),
    },
];

const main = async (ingredients: TIngredientInput[]): Promise<Ingredient[]> => {
    const createdIngredients: Ingredient[] = [];
    for (const ingredient of ingredients) {
        const data: IngredientCreateInput = {
            alias: `${slug(ingredient.title)}-${slug(ingredient.type)}`,
            title: ingredient.title,
            description: ingredient.description,
            price: ingredient.price,
            payload: ingredient.payload,
            type: ingredient.type,
        };
        createdIngredients.push(await prismaClient.ingredient.create({ data }));
    }
    return createdIngredients;
};

export const seedIngredients = async (): Promise<Ingredient[]> => {
    return main(ingredients)
        .then(async (res) => {
            await prismaClient.$disconnect();
            // console.log(res);
            return res;
        })
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(() => {
            console.log('--- Ingredient Seeded ---');
        });
};

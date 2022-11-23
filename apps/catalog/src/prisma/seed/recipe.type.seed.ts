import {
    Category,
    PrismaClient,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';

const prismaClient = new PrismaClient();

export interface IRecipeType {
    uuid: string;
    title: string;
    description: string;
}

const recipeTypes: IRecipeType[] = [
    {
        uuid: crypto.randomUUID(),
        title: 'Salty',
        description: 'Clear taste',
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Spicy',
        description: 'If your life boring',
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Marinated',
        description: 'Some Marinated',
    },
];

const saveRecipeType = async ({
    uuid,
    title,
    description,
}: IRecipeType): Promise<RecipeType> => {
    try {
        return await prismaClient.recipeType.create({
            data: {
                uuid,
                title,
                description,
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const main = async (): Promise<RecipeType[]> => {
    const createdRecipeTypes: RecipeType[] = [];
    for (const recipeType of recipeTypes) {
        createdRecipeTypes.push(await saveRecipeType(recipeType));
    }
    return createdRecipeTypes;
};

export const seedRecipeTypes = async (): Promise<RecipeType[]> => {
    return await main()
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

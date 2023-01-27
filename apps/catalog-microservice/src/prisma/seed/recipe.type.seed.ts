import {
    Prisma,
    PrismaClient,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import RecipeTypeCreateInput = Prisma.RecipeTypeCreateInput;
import * as process from 'process';
import * as slug from 'slug';

const prismaClient = new PrismaClient();

type TRecipeTypeInput = {
    title: string;
    description: string;
};

const recipeTypes: TRecipeTypeInput[] = [
    {
        title: 'Salty',
        description: 'Clear taste',
    },
    {
        title: 'Spicy',
        description: 'If your life boring',
    },
    {
        title: 'Marinated',
        description: 'Some Marinated',
    },
    {
        title: 'Coriander',
        description: 'Some Coriander inside',
    },
    {
        title: 'BBQ',
        description: 'Barbeque marinade',
    },
    {
        title: 'Special chiefs',
        description: 'Some Special Marinade from chief',
    },
];

const main = async (recipeTypes: TRecipeTypeInput[]): Promise<RecipeType[]> => {
    const createdRecipeTypes: RecipeType[] = [];
    for (const recipeType of recipeTypes) {
        const data: RecipeTypeCreateInput = {
            alias: slug(recipeType.title),
            title: recipeType.title,
            description: recipeType.description,
        };
        createdRecipeTypes.push(await prismaClient.recipeType.create({ data }));
    }
    return createdRecipeTypes;
};

export const seedRecipeTypes = async (): Promise<RecipeType[]> => {
    const start = performance.now();

    return await main(recipeTypes)
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
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- RecipeType Seeded in ${end} ms ---`);
            });
        });
};

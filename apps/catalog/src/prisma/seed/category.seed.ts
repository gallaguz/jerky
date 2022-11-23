import { Category, PrismaClient } from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';

const prismaClient = new PrismaClient();

export interface ICategory {
    uuid: string;
    title: string;
    description: string;
}

const categories: ICategory[] = [
    {
        uuid: crypto.randomUUID(),
        title: 'Jerky',
        description: 'Perfect dry meat',
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Sausages',
        description: 'Premium sausages',
    },
];

const saveCategory = async ({
    uuid,
    title,
    description,
}: ICategory): Promise<Category> => {
    try {
        return await prismaClient.category.create({
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

const main = async (): Promise<Category[]> => {
    const createdCategories: Category[] = [];
    for (const category of categories) {
        createdCategories.push(await saveCategory(category));
    }
    return createdCategories;
};

export const seedCategories = async (): Promise<Category[]> => {
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

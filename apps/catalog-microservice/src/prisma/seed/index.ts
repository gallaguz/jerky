import {
    Category,
    Ingredient,
    Raw,
    RawType,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';

import { seedCategories } from './category.seed';
import { seedIngredients } from './ingredient.seed';
import { seedProducts } from './product.seed';
import { seedRaws } from './raw.seed';
import { seedRawTypes } from './raw-type.seed';
import { seedRecipes } from './recipe.seed';
import { seedRecipeTypes } from './recipe.type.seed';

const start = performance.now();

const seed = async (): Promise<void> => {
    const categories: Category[] = await seedCategories();
    const recipeTypes: RecipeType[] = await seedRecipeTypes();
    const ingredients: Ingredient[] = await seedIngredients();
    const raws: Raw[] = await seedRaws();
    const rawTypes: RawType[] = await seedRawTypes();
    const recipes: Recipe[] = await seedRecipes(
        recipeTypes,
        categories,
        raws,
        rawTypes,
        ingredients,
    );
    await seedProducts(recipes, recipeTypes, categories, raws, rawTypes);
};

void seed()
    .then(() => {
        const end = Math.floor(performance.now() - start);
        console.log(`\nSeeding complete in ${end} ms\n`);
    })
    .catch((e) => {
        if (e instanceof Error) {
            console.log(e.message);
            console.log(`\nSeeding finished with error\n`);
            process.exit(1);
        }
    })
    .finally(() => {
        process.exit(0);
    });

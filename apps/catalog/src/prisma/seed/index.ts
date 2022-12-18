// import { seedCategories } from './category.seed';
// import { seedRaws } from './raw.seed';
// import { seedRecipeTypes } from './recipe.type.seed';
// import { seedRecipes } from './recipe.seed';
// import { seedIngredients } from './ingredient.seed';
// import { seedProducts } from './product.seed';
//
// const start = performance.now();
//
// const seed = async (): Promise<void> => {
//     const categories = await seedCategories();
//     const recipeTypes = await seedRecipeTypes();
//     const ingredients = await seedIngredients();
//     const raws = await seedRaws(categories);
//
//     const recipes = await seedRecipes(
//         recipeTypes,
//         categories,
//         raws,
//         ingredients,
//     );
//     await seedProducts(recipes, recipeTypes, categories, raws);
// };
//
// void seed()
//     .then(() => {
//         const end = Math.floor(performance.now() - start);
//         console.log(`\nSeeding complete in: ${end}ms\n`);
//     })
//     .catch((e) => {
//         if (e instanceof Error) {
//             const end = Math.floor(performance.now() - start);
//             console.log(e.message);
//             console.log(`\nSeeding finished with error in: ${end} ms\n`);
//             process.exit(1);
//         }
//     })
//     .finally(() => {
//         console.log(`\nSeeding complete with exit code 0\n\n`);
//         process.exit(0);
//     });

import {Recipe} from "./recipe.interface";

export interface DetailedRecipe extends Recipe {
    images: string[];
    difficulty: string;
    ingredients: string[];
    instructions: string[];
}

import {Recipe} from "./recipe.interface";
import {Difficulty} from "../types/difficulty.type";

export interface DetailedRecipe extends Recipe {
    images: string[];
    difficulty: Difficulty;
    ingredients: string[];
    instructions: string[];
}

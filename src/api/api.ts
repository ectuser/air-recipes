import {appConfig} from "../app-config";
import {DetailedRecipe} from "../interfaces/detailed-recipe.interface";
import {Recipe} from "../interfaces/recipe.interface";

class Api {
    private serverUrl = appConfig.serverUrl;
    async fetchRecipe(id: string): Promise<DetailedRecipe>{
        return fetch(`${this.serverUrl}detail_${id}.json`)
            .then(res => res.json())
            .then(res => res.recipe);
    }
    async fetchRecipes(): Promise<Recipe[]> {
        return fetch(`${this.serverUrl}list.json`)
            .then(res => res.json())
            .then(res => res.recipes);
    }
}

export const api = new Api();

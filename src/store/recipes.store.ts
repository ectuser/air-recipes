import {action, computed, makeAutoObservable, observable} from "mobx";
import {Recipe} from "../interfaces/recipe.interface";
import {DetailedRecipe} from "../interfaces/detailed-recipe.interface";
import {api} from "../api/api";
import {Cuisine} from "../interfaces/cuisine.interface";

class RecipesStore{
    private loadedRecipes: Recipe[] = []
    @observable recipes: Recipe[] = []
    @observable recipe?: DetailedRecipe;
    constructor() {
        makeAutoObservable(this)
    }

    @computed get cuisines(): Cuisine[]{
        const cuisines: Cuisine[] = []
        this.recipes.forEach(recipe => {
            if (!cuisines.find(el => el.id === recipe.cuisine.id)){
                cuisines.push({...recipe});
            }
        });
        return cuisines;
    }

    @action setRecipes(newRecipes: Recipe[]){
        this.recipes = [...newRecipes];
    }

    async fetchRecipes(){
        try {
            const res = await api.fetchRecipes();
            this.setRecipes(res);
            this.loadedRecipes = res;
        } catch (e){
            console.log(e)
        }
    }

    resetSearch() {
        this.setRecipes(this.loadedRecipes);
    }

    search(searchString: string) {
        const filteredArray = this.recipes.filter(el => el.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));
        this.setRecipes(filteredArray);
    }
}

export const recipesStore = new RecipesStore();

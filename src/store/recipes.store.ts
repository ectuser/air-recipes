import {action, computed, makeAutoObservable, observable} from "mobx";
import {Recipe} from "../interfaces/recipe.interface";
import {DetailedRecipe} from "../interfaces/detailed-recipe.interface";
import {api} from "../api/api";
import {Cuisine} from "../interfaces/cuisine.interface";
import {Filter} from "../interfaces/filter.interface";

class RecipesStore{
    private loadedRecipes: Recipe[] = [];
    @observable recipes: Recipe[] = [];
    @observable recipe?: DetailedRecipe;
    constructor() {
        makeAutoObservable(this)
    }

    @computed get cuisines(): Cuisine[]{
        const cuisines: Cuisine[] = []
        this.loadedRecipes.forEach(recipe => {
            if (!cuisines.find(el => el.id === recipe.cuisine.id)){
                cuisines.push({...recipe.cuisine});
            }
        });
        return cuisines;
    }

    @computed get calories(): [first: number, second: number]{
        const result: [first: number, second: number] = [900000, 0];
        this.loadedRecipes.forEach(el => {
            if (el.caloricity < result[0]){
                result[0] = el.caloricity;
            }
            if (el.caloricity > result[1]){
                result[1] = el.caloricity;
            }
        });
        return result;
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

    search(filter: Filter) {
        console.log(filter)
        let tempArray = [...this.loadedRecipes];
        if (filter.searchString){
            tempArray = tempArray.filter(el => el.title.toLocaleLowerCase().includes(filter.searchString!.toLocaleLowerCase()));
        }
        if (filter.range){
            tempArray = tempArray.filter(el => el.caloricity >= filter.range![0] && el.caloricity <= filter.range![1]);
        }
        if (filter.checkboxes) {
            tempArray = tempArray.filter(el => filter.checkboxes?.find(checkbox => checkbox.id === el.id && checkbox.checked));
        }
        this.setRecipes(tempArray);
    }
}

export const recipesStore = new RecipesStore();

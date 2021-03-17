import {Cuisine} from "./cuisine.interface";

export interface Recipe {
    id: number;
    title: string;
    description: string;
    caloricity: number;
    cookTime: number;
    thumbnail: string;
    cuisine: Cuisine;
}

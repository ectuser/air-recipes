import React, {useEffect, useState} from "react";
import {api} from "../../api/api";
import {DetailedRecipe} from "../../interfaces/detailed-recipe.interface";
export const RecipePage = ({match}: {match: any}) => {
    const recipeId = match.params.id;
    const [recipe, setRecipe] = useState<DetailedRecipe>();
    useEffect(() => {
        if (recipeId) {
            api.fetchRecipe(recipeId).then(res => setRecipe(res));
        }
    }, [])

    return (
        <div>
            <h1>{recipe?.title}</h1>
            <p>{recipe?.description}</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <span>{recipe?.difficulty}</span>
                <span>{recipe?.cookTime}</span>
                <span>{recipe?.caloricity}</span>
                <span>{recipe?.cuisine.title}</span>
            </div>
            <h2>Ingredients</h2>
            {recipe?.ingredients.map(el => (
                <div>{el}</div>
            ))}
            <h2>Instructions</h2>
            {recipe?.instructions.map(el => (
                <div>{el}</div>
            ))}
            <div>
                {recipe?.images.map(el => (
                    <img src={el} alt=""/>
                ))}
            </div>

        </div>
    )
}

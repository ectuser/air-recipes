import React, {useEffect} from 'react';
import {recipesStore} from "../../store/recipes.store";
import {observer} from "mobx-react-lite";
import {RecipeCard} from "../../components/RecipeCard/RecipeCard";
import './Home.scss';

export const Home = observer(() => {

    const recipes = () => (recipesStore.recipes.map(el => (
        <RecipeCard recipe={el} key={el.id} />
    )))

    useEffect(() => {
        recipesStore.fetchRecipes();
    }, [])

    return (
        <div className="container">
            {recipes()}
        </div>
    )
})

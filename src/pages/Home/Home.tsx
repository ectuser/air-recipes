import React, {useEffect} from 'react';
import {recipesStore} from "../../store/recipes.store";
import {observer} from "mobx-react-lite";
import {RecipeCard} from "../../components/RecipeCard/RecipeCard";
import './Home.scss';
import {Link} from "react-router-dom";

export const Home = observer(() => {

    const recipes = () => (recipesStore.recipes.map(el => (
        <Link to={`/recipes/${el.id}`} style={{ textDecoration: 'none' }}>
            <RecipeCard recipe={el} key={el.id} />
        </Link>
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

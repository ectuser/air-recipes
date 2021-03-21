import React, {useEffect} from 'react';
import {recipesStore} from "../../store/recipes.store";
import {observer} from "mobx-react-lite";
import {RecipeCard} from "../../components/RecipeCard/RecipeCard";
import './Home.scss';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        padding: '0 98px',
        margin: '0 auto',
        gridGap: '24px 20px',
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    card: {
        textDecoration: 'none',
    }
})

export const Home = observer(() => {
    const classes = useStyles();
    const recipes = () => (recipesStore.recipes.map(el => (
        <Link key={el.id} to={`/recipes/${el.id}`} className={classes.card}>
            <RecipeCard recipe={el} />
        </Link>
    )))

    useEffect(() => {
        recipesStore.fetchRecipes();
    }, [])

    return (
        <div className={classes.container}>
            {recipes()}
        </div>
    )
})

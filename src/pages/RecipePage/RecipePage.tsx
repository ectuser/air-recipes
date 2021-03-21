import React, {useEffect, useState} from "react";
import {api} from "../../api/api";
import {DetailedRecipe} from "../../interfaces/detailed-recipe.interface";
import { List, ListItem, SvgIcon, Typography} from "@material-ui/core";
import './RecipePage.scss';
import {ReactComponent as DifficultyIcon} from '../../assets/difficultyIcon.svg';
import {ReactComponent as CaloriesIcon} from '../../assets/caloriesIcon.svg';
import {ReactComponent as TimeIcon} from '../../assets/timeIcon.svg';
import {ReactComponent as CuisneIcon} from '../../assets/cuisineIcon.svg';
import {Difficulty} from '../../types/difficulty.type';
import {recipeHelper, TimeEnum} from "../../utils/recipe.helper";
import {appConfig} from "../../app-config";
import {RouteComponentProps} from 'react-router-dom';

interface RecipePageProps extends RouteComponentProps<{id: string}>{
}

export const RecipePage = ({match}: RecipePageProps) => {
    const recipeId = match.params.id;
    const [recipe, setRecipe] = useState<DetailedRecipe>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const timeData = recipe?.cookTime ? recipeHelper.convertSeconds(recipe.cookTime) : '';
    const difficulties: Record<Difficulty, string> = {easy: appConfig.themeColors.$easy, medium: appConfig.themeColors.$medium, hard: appConfig.themeColors.$hard};

    useEffect(() => {
        if (recipeId) {
            api.fetchRecipe(recipeId).then(res => setRecipe(res));
        }
    }, []);

    useEffect(() => {
        const inter = setTimeout(() => {
            if (recipe?.images.length){
                setSelectedImage(selectedImage + 1 < recipe?.images.length ? selectedImage + 1 : 0);
            }
        }, 3000);
        return () => {
            clearInterval(inter);
        }
    }, [recipe, selectedImage])

    return (
        <div className="recipe">
            <div className="recipe__column">
                <Typography variant="h2" component="h2">{recipe?.title}</Typography>
                <Typography variant="body1" component="div">{recipe?.description}</Typography>
                <div className="metadata">
                    <div className="metadata__item">
                        <SvgIcon style={{color: recipe?.difficulty ? difficulties[recipe.difficulty] : 'black'}} className="metadata__icon">
                            <DifficultyIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.difficulty && recipeHelper.capitalizeFirstLetter(recipe.difficulty)}</Typography>
                    </div>
                    <div className="metadata__item">
                        <SvgIcon className="metadata__icon">
                            <TimeIcon/>
                        </SvgIcon>
                        {
                            timeData &&
                            <Typography variant="body1" component="div">{timeData.time} {TimeEnum[timeData.type]}</Typography>
                        }
                    </div>
                    <div className="metadata__item">
                        <SvgIcon className="metadata__icon">
                            <CaloriesIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.caloricity} kCal</Typography>
                    </div>
                    <div className="metadata__item">
                        <SvgIcon className="metadata__icon">
                            <CuisneIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.cuisine.title}</Typography>
                    </div>
                </div>
                <Typography variant="h3" component="h3">Ingredients</Typography>
                <List className="recipe__ingredients">
                    {recipe?.ingredients.map((el, index) => (
                        <ListItem key={`ingredients-${index}`}>
                            <Typography variant="body1" component="li">{el}</Typography>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h3" component="h3">Instructions</Typography>
                <List className="recipe__instructions">
                    {recipe?.instructions.map((el, index) => (
                        <ListItem key={`instructions-${index}`} className="recipe__instructions-item">
                            <Typography variant="subtitle2" component="div" className="recipe__instructions-circle">{index + 1}</Typography>
                            <Typography variant="body1" component="div">{el}</Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
            {
                recipe?.images.length !== 0 &&
                <div className="recipe__column images">
                    <img className="images__main-image" src={recipe?.images[selectedImage]} alt=""/>
                    <div className="images__other-images">
                        {recipe?.images.map((el, index) => (
                            <img onClick={() => {setSelectedImage(index)}} key={`images-${index}`} className={index !== selectedImage ? 'images__sub-image' : 'images__sub-image_active'} src={el} alt=""/>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

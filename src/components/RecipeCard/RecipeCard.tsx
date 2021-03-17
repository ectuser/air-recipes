import React from "react";
import {Recipe} from "../../interfaces/recipe.interface";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import './RecipeCard.scss';
import {cardHelper, TimeEnum} from "../../utils/card.helper";

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeCardProps) => {
    const timeData = cardHelper.convertSeconds(recipe.cookTime);

    return (
        <Card className="card">
            <CardActionArea>
                <CardMedia
                    className="card__media"
                    image={recipe.thumbnail}
                    title={recipe.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {recipe.description}
                    </Typography>
                    <Typography>{timeData.time} {TimeEnum[timeData.type]}</Typography>
                    <Typography>{recipe.caloricity} kCal</Typography>
                    <Typography>{recipe.cuisine.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

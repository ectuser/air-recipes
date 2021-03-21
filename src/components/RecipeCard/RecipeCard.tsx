import React, {useEffect, useState} from "react";
import {Recipe} from "../../interfaces/recipe.interface";
import {Card, CardContent, CardMedia, Chip, Typography} from "@material-ui/core";
import './RecipeCard.scss';
import {recipeHelper, TimeEnum} from "../../utils/recipe.helper";

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeCardProps) => {
    const timeData = recipeHelper.convertSeconds(recipe.cookTime);
    const [cardDescription, setCardDescription] = useState(recipe.description);

    useEffect(() => {
        if (cardDescription.length >= 147) {
            setCardDescription(`${cardDescription.slice(0, 147)}...`)
        }
    }, [])

    return (
        <Card className="card">
            <CardMedia
                className="card__media"
                image={recipe.thumbnail}
                title={recipe.title}
            >
                <div className="card__chip-list">
                    <Chip className="card__chip" label={`${timeData.time} ${TimeEnum[timeData.type]}`} />
                    <Chip className="card__chip" label={`${recipe.caloricity} kCal`}/>
                    <Chip className="card__chip" label={recipe.cuisine.title} />
                </div>
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                    {recipe.title}
                </Typography>
                <Typography variant="body1" component="p">
                    {cardDescription}
                </Typography>
            </CardContent>
        </Card>
    )
}

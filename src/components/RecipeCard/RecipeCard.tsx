import React from "react";
import {Recipe} from "../interfaces/recipe.interface";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeCardProps) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
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
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

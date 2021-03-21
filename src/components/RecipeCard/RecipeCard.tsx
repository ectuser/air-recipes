import React, {useEffect, useState} from "react";
import {Recipe} from "../../interfaces/recipe.interface";
import {Card, CardContent, CardMedia, Chip, makeStyles, Typography} from "@material-ui/core";
import {recipeHelper, TimeEnum} from "../../utils/recipe.helper";

const useStyles = makeStyles(theme => ({
    card: {
        width: '348px',
        height: '384px',
    },
    cardMedia: {
        height: '196px',
        position: 'relative',
    },
    chipList: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    },
    chip:{
        '&:not(:last-child)': {
            marginRight: theme.spacing(1),
        }
    }
}))

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeCardProps) => {
    const timeData = recipeHelper.convertSeconds(recipe.cookTime);
    const [cardDescription, setCardDescription] = useState(recipe.description);
    const classes = useStyles();

    useEffect(() => {
        if (cardDescription.length >= 147) {
            setCardDescription(`${cardDescription.slice(0, 147)}...`)
        }
    }, [])

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={recipe.thumbnail}
                title={recipe.title}
            >
                <div className={classes.chipList}>
                    <Chip className={classes.chip} label={`${timeData.time} ${TimeEnum[timeData.type]}`} />
                    <Chip className={classes.chip} label={`${recipe.caloricity} kCal`}/>
                    <Chip className={classes.chip} label={recipe.cuisine.title} />
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

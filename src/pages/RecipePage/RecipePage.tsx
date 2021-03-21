import React, {useEffect, useState} from "react";
import {api} from "../../api/api";
import {DetailedRecipe} from "../../interfaces/detailed-recipe.interface";
import {List, ListItem, makeStyles, SvgIcon, Typography} from "@material-ui/core";
import {ReactComponent as DifficultyIcon} from '../../assets/difficultyIcon.svg';
import {ReactComponent as CaloriesIcon} from '../../assets/caloriesIcon.svg';
import {ReactComponent as TimeIcon} from '../../assets/timeIcon.svg';
import {ReactComponent as CuisneIcon} from '../../assets/cuisineIcon.svg';
import {Difficulty} from '../../types/difficulty.type';
import {recipeHelper, TimeEnum} from "../../utils/recipe.helper";
import {RouteComponentProps} from 'react-router-dom';
import {applicationColors} from "../../application-theme";
// @ts-ignore
import Carousel from "react-simply-carousel";

const useStyles = makeStyles(theme => ({
    recipe: {
        padding: '0 98px',
        display: 'flex',
    },
    recipeColumn: {
        flex: 1,
        '&:not(:last-child)': {
            marginRight: '20px',
        }
    },
    recipeIngredients: {
        listStyle: 'none',
        marginBottom: '32px',
    },
    recipeIngredient: {
        position: 'relative',
        '&::before': {
            content: '"."',
            fontSize: '30px',
            position: 'absolute',
            height: '20px',
            width: '20px',
            transform: 'translateY(-50%)',
        },
        '&:not(:last-child)': {
            marginBottom: '10px',
        },
    },
    recipeInstructionsCircle: {
        borderRadius: '50%',
        border: '1px solid',
        borderColor: applicationColors.$shade20,
        padding: '3px 5px',
        marginRight: theme.spacing(1),
    },
    recipeInstructionsItem: {
        paddingLeft: '0',
    },
    metadata: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
    },
    metadataItem: {
        display: 'flex',
        '&:not(:last-child)': {
            marginRight: theme.spacing(4),
        }
    },
    metadataIcon: {
        marginRight: '10px',
    },
    mainImage: {
        width: '532px',
        height: '355px',
    },
    otherImages: {
        marginTop: theme.spacing(2)
    },
    subImage: {
        width: '56px',
        height: '56px',
        cursor: 'pointer',
        '&:not(:last-child)': {
            marginRight: theme.spacing(1),
        }
    },
    subImageActive: {
        border: '2px solid',
        borderColor: applicationColors.$base0,
        boxSizing: 'border-box',
    }
}))

interface RecipePageProps extends RouteComponentProps<{id: string}>{
}

export const RecipePage = ({match}: RecipePageProps) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const recipeId = match.params.id;
    const [recipe, setRecipe] = useState<DetailedRecipe>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const timeData = recipe?.cookTime ? recipeHelper.convertSeconds(recipe.cookTime) : '';
    const difficulties: Record<Difficulty, string> = {easy: applicationColors.$easy, medium: applicationColors.$medium, hard: applicationColors.$hard};
    const classes = useStyles();

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
        <div className={classes.recipe}>
            <div className={classes.recipeColumn}>
                <Typography variant="h2" component="h2">{recipe?.title}</Typography>
                <Typography variant="body1" component="div">{recipe?.description}</Typography>
                <div className={classes.metadata}>
                    <div style={{color: recipe?.difficulty ? difficulties[recipe.difficulty] : 'black'}} className={classes.metadataItem}>
                        <SvgIcon className={classes.metadataIcon}>
                            <DifficultyIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.difficulty && recipeHelper.capitalizeFirstLetter(recipe.difficulty)}</Typography>
                    </div>
                    <div className={classes.metadataItem}>
                        <SvgIcon className={classes.metadataIcon}>
                            <TimeIcon/>
                        </SvgIcon>
                        {
                            timeData &&
                            <Typography variant="body1" component="div">{timeData.time} {TimeEnum[timeData.type]}</Typography>
                        }
                    </div>
                    <div className={classes.metadataItem}>
                        <SvgIcon className={classes.metadataIcon}>
                            <CaloriesIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.caloricity} kCal</Typography>
                    </div>
                    <div className={classes.metadataItem}>
                        <SvgIcon className={classes.metadataIcon}>
                            <CuisneIcon/>
                        </SvgIcon>
                        <Typography variant="body1" component="div">{recipe?.cuisine.title}</Typography>
                    </div>
                </div>
                <Typography variant="h3" component="h3">Ingredients</Typography>
                <List className={classes.recipeIngredients}>
                    {recipe?.ingredients.map((el, index) => (
                        <Typography className={classes.recipeIngredient} key={`ingredients-${index}`} variant="body1" component="li">
                            <div style={{marginLeft: '15px'}}>{el}</div>
                        </Typography>
                    ))}
                </List>
                <Typography variant="h3" component="h3">Instructions</Typography>
                <List>
                    {recipe?.instructions.map((el, index) => (
                        <ListItem key={`instructions-${index}`} className={classes.recipeInstructionsItem}>
                            <Typography variant="subtitle2" component="div" className={classes.recipeInstructionsCircle}>{index + 1}</Typography>
                            <Typography variant="body1" component="div">{el}</Typography>
                        </ListItem>
                    ))}
                </List>
                <div>
                </div>


            </div>
            {
                recipe?.images.length !== 0 &&
                <div className={classes.recipeColumn}>
                    {recipe?.images && recipe?.images.length > 1 &&
                        <Carousel
                            updateOnItemClick
                            activeSlideIndex={selectedImage}
                            onRequestChange={setSelectedImage}
                            forwardBtnProps={{
                                style: {
                                    display: 'none'
                                }
                            }}
                            backwardBtnProps={{
                                style: {
                                    display: 'none',
                                }
                            }}
                            itemsToShow={1}
                            speed={400}
                        >
                            {recipe?.images.map((el, index) => (
                                <img key={index} className={classes.mainImage} src={recipe?.images[selectedImage]} alt=""/>
                            ))}
                        </Carousel>
                    }
                    {recipe?.images && recipe?.images.length === 1 &&
                        <img className={classes.mainImage} src={recipe?.images[selectedImage]} alt=""/>
                    }
                    <div className={classes.otherImages}>
                        {recipe?.images.map((el, index) => (
                            <img onClick={() => {setSelectedImage(index)}} key={`images-${index}`} className={index !== selectedImage ? classes.subImage : [classes.subImage, classes.subImageActive].join(' ')} src={el} alt=""/>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

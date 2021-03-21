import React, {useEffect, useState} from 'react';
import {Box, IconButton, InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import {recipesStore} from "../../store/recipes.store";
import {FilterDialog} from "../FilterDialog/FilterDialog";
import {observer} from "mobx-react-lite";
import {Filter} from "../../interfaces/filter.interface";
import {FilterCuisineCheckbox} from "../../interfaces/filter-cuisine-checkbox.interface";
import {useHistory, useLocation} from "react-router";
import CancelIcon from '@material-ui/icons/Cancel';
import HeaderImage from '../../assets/header-image.png'
import './Header.scss';
import {appConfig} from "../../app-config";

const useStyles = makeStyles({
    iconButton: {
        border: '1px solid',
        borderColor: appConfig.themeColors.$shade20,
        padding: '15px 15px',
    },
});

export const Header = observer(() => {
    const history = useHistory();
    const location = useLocation();
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState<string>('');
    const [filterData, setFilterData] = useState<Filter>({});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

    console.log('render');

    useEffect(() => {
        window.addEventListener('scroll', parallaxShift);
        return () => {
            window.removeEventListener('scroll', parallaxShift);
        }
    }, []);

    const parallaxShift = () => {
        setOffset(window.pageYOffset);
    };

    useEffect(() => {
        processFilter();
        showResults();
    }, [recipesStore.cuisines, recipesStore.calories]);

    useEffect(() => {
        console.log('yeah');
        showResults();
    }, [filterData])

    const processFilter = () => {
        const checkboxes: FilterCuisineCheckbox[] = recipesStore.cuisines.map(el => ({...el, checked: true}));
        setFilterData({...filterData, checkboxes, range: recipesStore.calories});
        console.log(checkboxes, recipesStore.calories)
    }

    const onChange = ($event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText($event.target.value);
    }

    const showResults = () => {
        history.push('/');
        recipesStore.search(filterData);
    }

    const onFilterSet = (filter: Filter) => {
        setFilterData({...filterData, ...filter});
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            setFilterData({...filterData, searchString: searchText});
        }
    }

    const clearSearchString = () => {
        setSearchText('');
        setFilterData({...filterData, searchString: ''});
    }

    const classes = useStyles();

    const changeByOffset = (minValue: number, baseValue: number, coefficient: number = 1) => {
        if (location.pathname.includes('recipes')){
            return minValue;
        } else{
            return baseValue - offset * coefficient >= minValue ? baseValue - offset * coefficient : minValue
        }
    }


    return (
        <div className="header" style={{height: changeByOffset(292, 600)}}>
            <div className="header__search" style={{marginBottom: changeByOffset(-20, 280, 1.4)}}>
                <Typography variant="h1" component="h1">
                    Air Recipes
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    Best Recipes for Best People
                </Typography>
                <div className="header__search-bar">
                    <Box marginRight={2}>
                        <TextField
                            className="header__input"
                            value={searchText}
                            placeholder="Search"
                            variant="outlined"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className="header__input-icon" position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: searchText && (
                                    <InputAdornment className="header__input-icon header__end-icon" position="end" onClick={clearSearchString}>
                                        <CancelIcon fontSize={"small"} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box>
                        <IconButton className={classes.iconButton} aria-label="Filter options" onClick={() => {setIsFilterDialogOpen(true)}}>
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                </div>
            </div>
            <div className="header__image">
                    <img src={HeaderImage} alt="123"/>
            </div>
            <FilterDialog
                filter={filterData}
                setFilterData={onFilterSet}
                loadedCalories={recipesStore.calories}
                isOpen={isFilterDialogOpen}
                setIsOpen={setIsFilterDialogOpen}
            />
        </div>
    )
})

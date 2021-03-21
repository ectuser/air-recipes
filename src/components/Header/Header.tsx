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
import {applicationColors} from "../../application-theme";

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        marginBottom: '60px',
    },
    searchColumn: {
        marginLeft: '90px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    searchBar: {
        marginTop: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        color: applicationColors.$shade40,
    },
    endIcon: {
        cursor: 'pointer',
    },
    iconButton: {
        border: '1px solid',
        borderColor: applicationColors.$shade20,
        padding: '15px 15px',
    },
    image: {
        overflow: 'hidden',
    }
}));

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
        console.log('show results')
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
        <div className={classes.header} style={{height: changeByOffset(292, 600)}}>
            <div className={classes.searchColumn} style={{marginBottom: changeByOffset(-28, 270, 1.4)}}>
                <Typography variant="h1" component="h1">
                    Air Recipes
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    Best Recipes for Best People
                </Typography>
                <div className={classes.searchBar}>
                    <Box marginRight={2}>
                        <TextField
                            value={searchText}
                            placeholder="Search"
                            variant="outlined"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.inputIcon} position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: searchText && (
                                    <InputAdornment className={[classes.inputIcon, classes.endIcon].join(' ')} position="end" onClick={clearSearchString}>
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
            <div className={classes.image}>
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

import React, {useEffect, useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import {recipesStore} from "../../store/recipes.store";
import {FilterDialog} from "../FilterDialog/FilterDialog";
import {observer} from "mobx-react-lite";
import {Filter} from "../../interfaces/filter.interface";
import {FilterCuisineCheckbox} from "../../interfaces/filter-cuisine-checkbox.interface";
import {useHistory} from "react-router";
import CancelIcon from '@material-ui/icons/Cancel';

export const Header = observer(() => {
    const history = useHistory()
    const [searchText, setSearchText] = useState<string>('');
    const [filterData, setFilterData] = useState<Filter>({});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

    console.log('render')

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
    }

    return (
        <div style={{marginTop: '10px'}}>
            <div className="search">
                <TextField
                    value={searchText}
                    placeholder="Search"
                    variant="outlined"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchText && (
                            <InputAdornment style={{cursor: 'pointer'}} position="end" onClick={clearSearchString}>
                                <CancelIcon/>
                            </InputAdornment>
                        )
                    }}
                />
                <IconButton color="primary" aria-label="Filter options" onClick={() => {setIsFilterDialogOpen(true)}}>
                    <FilterListIcon />
                </IconButton>
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

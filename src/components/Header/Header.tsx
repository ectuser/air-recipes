import React, {useEffect, useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import {recipesStore} from "../../store/recipes.store";
import {FilterDialog} from "../FilterDialog/FilterDialog";
import {observer} from "mobx-react-lite";

export const Header = observer(() => {
    const [searchText, setSearchText] = useState<string>('');
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log(recipesStore.cuisines)
    }, [])

    const onChange = ($event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText($event.target.value);
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            if (searchText) {
                recipesStore.search(searchText);
            } else {
                recipesStore.resetSearch();
            }
        }
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
                    }}
                />
                <IconButton color="primary" aria-label="Filter options" onClick={() => {setIsFilterDialogOpen(true)}}>
                    <FilterListIcon />
                </IconButton>
            </div>

            <FilterDialog cuisines={recipesStore.cuisines} isOpen={isFilterDialogOpen} />
        </div>
    )
})

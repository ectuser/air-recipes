import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, Slider
} from "@material-ui/core";
import {Cuisine} from "../../interfaces/cuisine.interface";
import {FilterCuisineCheckbox} from "../../interfaces/filter-cuisine-checkbox.interface";
import './FilterDialog.scss';
import {RangeType} from "../../types/range.type";
import {Filter} from "../../interfaces/filter.interface";

export interface FilterDialogProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
    loadedCalories: RangeType;
    setFilterData: (filter: Filter) => void;
    filter: Filter;
}

export const FilterDialog = ({ isOpen, loadedCalories, setFilterData, setIsOpen, filter }: FilterDialogProps) => {
    const [checkboxes, setCheckboxes] = useState<FilterCuisineCheckbox[]>();
    const [caloriesRange, setCaloriesRange] = useState<RangeType>([0, 10]);
    const [filterChanged, setFilterChanged] = useState<boolean>(false);

    useEffect(() => {
        processProps();
    }, [filter]);

    const processProps = () => {
        setCheckboxes(filter.checkboxes || []);
        setCaloriesRange(filter.range || [0, 10]);
    }

    const handleSliderChange = (_: React.ChangeEvent<{}>, value: number | number[]) => {
        setFilterChanged(true);
        setCaloriesRange(value as RangeType);
    }

    const handleCheckboxChange = (id: number, status: boolean) => {
        setFilterChanged(true);
        if (checkboxes){
            const temp = [...checkboxes];
            const index = temp.findIndex(el => el.id === id);
            if (index !== -1){
                temp[index] = {...temp[index], checked: status};
                setCheckboxes(temp);
            }
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleSubmit = () => {
        setFilterData({range: caloriesRange, checkboxes: checkboxes});
        handleClose();
    }

    const handleClear = () => {
        setCheckboxes(checkboxes?.map(el => ({...el, checked: true})));
        setCaloriesRange([loadedCalories[0], loadedCalories[1]]);
    }

    return (
        <Dialog
            aria-labelledby="confirmation-dialog-title"
            open={isOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
                <div className="checkboxes">
                    {checkboxes?.map(el => (
                        <div key={el.id}>
                            <div className="checkboxes__row" key={el.id}>
                                <div className="checkboxes__label">{el.title}</div>
                                <Checkbox
                                    data-id={el.id.toString()}
                                    className="checkboxes__checkbox"
                                    checked={el.checked}
                                    onChange={(_, status) => {handleCheckboxChange(el.id, status)}}
                                />
                            </div>
                            <Divider/>
                        </div>
                    ))}
                </div>
                <Slider
                    value={caloriesRange}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={loadedCalories[0]}
                    max={loadedCalories[1]}
                />
            </DialogContent>
            <DialogActions>
                {
                    filterChanged &&
                    <Button onClick={handleClear} color="primary">
                        Clear
                    </Button>
                }
                <Button onClick={handleSubmit} color="primary">
                    Show Recipes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

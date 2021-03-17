import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Divider, Slider
} from "@material-ui/core";
import {Cuisine} from "../../interfaces/cuisine.interface";
import {FilterCuisineCheckbox} from "../../interfaces/filter-cuisine-checkbox.interface";
import './FilterDialog.scss';

export interface FilterDialogProps {
    isOpen: boolean;
    cuisines: Cuisine[]
}

export const FilterDialog = ({ isOpen, cuisines }: FilterDialogProps) => {
    const [checkboxes, setCheckboxes] = useState<FilterCuisineCheckbox[]>()

    useEffect(() => {
        processCheckboxes();
    }, [cuisines]);

    const processCheckboxes = () => {
        setCheckboxes(cuisines.map(el => ({...el, checked: false})));
    }

    const handleClose = () => {}

    const handleSubmit = () => {}

    const handleClear = () => {}

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
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
                        <div>
                            <div className="checkboxes__row" key={el.id}>
                                <div className="checkboxes__label">{el.title}</div>
                                <Checkbox className="checkboxes__checkbox" checked={el.checked} />
                            </div>
                            <Divider/>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClear} color="primary">
                    Clear
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Show Recipes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

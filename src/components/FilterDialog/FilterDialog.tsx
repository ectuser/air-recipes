import React, {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, IconButton, makeStyles, Slider, Typography
} from "@material-ui/core";
import {FilterCuisineCheckbox} from "../../interfaces/filter-cuisine-checkbox.interface";
import {RangeType} from "../../types/range.type";
import {Filter} from "../../interfaces/filter.interface";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'relative',
    },
    checkboxes: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(9),
    },
    checkbox: {
        paddingRight: 0,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
    },
    closeButton: {
        position: 'absolute',
        right: 21,
        top: 21,
        padding: 0,
    },
}));

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

    const classes = useStyles();

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
            open={isOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            className={classes.dialog}
        >
            <DialogTitle>
                <Typography variant="h3" component="h3">
                    Filter
                </Typography>
                <IconButton color="secondary" className={classes.closeButton} aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className={classes.checkboxes}>
                    {checkboxes?.map(el => (
                        <div key={el.id}>
                            <div className={classes.row} key={el.id}>
                                <div className={classes.label}>
                                    <Typography variant="body1" component="div">
                                        {el.title}
                                    </Typography>
                                </div>
                                <Checkbox
                                    data-id={el.id.toString()}
                                    className={classes.checkbox}
                                    checked={el.checked}
                                    onChange={(_, status) => {handleCheckboxChange(el.id, status)}}
                                />
                            </div>
                            <Divider/>
                        </div>
                    ))}
                </div>
                <Slider
                    color="secondary"
                    value={caloriesRange}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={loadedCalories[0]}
                    max={loadedCalories[1]}
                />
                <Typography
                    variant="body1"
                    component="div"
                >Calories, kCal</Typography>
            </DialogContent>
            <DialogActions>
                {
                    <Button style={{opacity: filterChanged ? 1 : 0}} variant="outlined" onClick={handleClear} color="secondary">
                        Clear
                    </Button>
                }
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Show Recipes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

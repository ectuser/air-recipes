import {RangeType} from "../types/range.type";
import {FilterCuisineCheckbox} from "./filter-cuisine-checkbox.interface";

export interface Filter {
    range?: RangeType;
    checkboxes?: FilterCuisineCheckbox[];
    searchString?: string;
}

import { IngredientStatus, IngredientType } from '../Ingredient';
import { Tag } from './Tag';
import { ingredientTags } from '../ingredientTags';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MultiSelectDropdown from '../MultiSelectDropdown';

type IngredientFiltersProps = {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDirection: number;
    setSortDirection: (value: number) => void;
    chooseType: (types: Array<IngredientType>) => void;
    chooseStatus: (statuses: Array<IngredientStatus>) => void;
    toggleFilter: (name: string, checked: boolean) => void;
};

export function IngredientFilters(props: IngredientFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    const typeOptions = [
        { label: 'Food', value: IngredientType.Food },
        { label: 'Hygiene', value: IngredientType.Hygiene },
        { label: 'Cleaning', value: IngredientType.Cleaning },
        { label: 'Other', value: IngredientType.Other },
    ]

    const statusOptions = [
        { label: 'Plenty', value: IngredientStatus.Plenty },
        { label: 'Low', value: IngredientStatus.Low },
        { label: 'Out', value: IngredientStatus.Out },
        { label: 'Ordered', value: IngredientStatus.Ordered },
    ]

    const filters = <>
        <div className="filter-row select-filters">
            <label>
                Item Type
                <MultiSelectDropdown<IngredientType> onChange={props.chooseType} options={typeOptions} />
            </label>
            <label>
                Status
                <MultiSelectDropdown<IngredientStatus> onChange={props.chooseStatus} options={statusOptions} />
            </label>
        </div>

        <div className=" filter-row tag-filters">
            {ingredientTags.map((tag, index) => <Tag key={index} name={tag} onSelect={props.toggleFilter} />)}
        </div>
    </>;
    return (<div className="filters">
        <div className="filter-header">
            <button className="icon-button filter-button" onClick={() => setShowFilters(!showFilters)}>
                <span>Filter</span><FontAwesomeIcon icon={showFilters ? faCaretDown : faCaretUp} />
            </button>
            <div className="sort-by">
                <label>Sort By</label>
                <select value={props.sortBy} onChange={(e) => props.setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="status-date">Updated Date</option>
                </select>
                <button className="icon-button sort-direction" onClick={() => props.setSortDirection(-props.sortDirection)}>
                    <FontAwesomeIcon icon={props.sortDirection === 1 ? faCaretUp : faCaretDown} />
                </button>
            </div>
        </div>
        {showFilters && filters}
    </div>);
}

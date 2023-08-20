import { IngredientStatus, IngredientType } from '../Ingredient';
import { Tag } from './Tag';
import { ingredientTags } from '../ingredientTags';
import { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

type IngredientFiltersProps = {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDirection: number;
    setSortDirection: (value: number) => void;
    chooseType: (e: ChangeEvent<HTMLSelectElement>) => void;
    chooseStatus: (e: ChangeEvent<HTMLSelectElement>) => void;
    toggleFilter: (name: string, checked: boolean) => void;
};

export function IngredientFilters(props: IngredientFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    const filters = <>
        <div className="filter-row select-filters">
            <label>
                Item Type
                <select onChange={props.chooseType}>
                    <option value={-1}>All</option>
                    <option value={(IngredientType.Food as number)}>Food</option>
                    <option value={(IngredientType.Hygiene as number)}>Hygiene</option>
                    <option value={(IngredientType.Cleaning as number)}>Cleaning</option>
                    <option value={(IngredientType.Other as number)}>Other</option>
                </select>
            </label>
            <label>
                Status
                <select onChange={props.chooseStatus}>
                    <option value={-1}>All</option>
                    <option value={(IngredientStatus.Plenty as number)}>Plenty</option>
                    <option value={(IngredientStatus.Low as number)}>Low</option>
                    <option value={(IngredientStatus.Out as number)}>Out</option>
                    <option value={(IngredientStatus.Ordered as number)}>Ordered</option>
                </select>
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

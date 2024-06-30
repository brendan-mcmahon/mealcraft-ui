import { GroceryStatus, GroceryType } from '../../Grocery';
import { Tag } from '../Tag';
import { groceryTags as groceryTags } from '../../groceryTags';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MultiSelectDropdown from '../../MultiSelectDropdown';

type GroceryFiltersProps = {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDirection: number;
    setSortDirection: (value: number) => void;
    chooseType: (types: Array<GroceryType>) => void;
    chooseStatus: (statuses: Array<GroceryStatus>) => void;
    toggleFilter: (name: string, checked: boolean) => void;
};

export function GroceryFilters(props: GroceryFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    const typeOptions = [
        { label: 'Food', value: GroceryType.Food },
        { label: 'Hygiene', value: GroceryType.Hygiene },
        { label: 'Cleaning', value: GroceryType.Cleaning },
        { label: 'Other', value: GroceryType.Other },
    ]

    const statusOptions = [
        { label: 'Plenty', value: GroceryStatus.Plenty },
        { label: 'Low', value: GroceryStatus.Low },
        { label: 'Out', value: GroceryStatus.Out },
        { label: 'Ordered', value: GroceryStatus.Ordered },
    ]

    const filters = <>
        <div className="filter-row select-filters">
            <label>
                Item Type
                <MultiSelectDropdown<GroceryType> onChange={props.chooseType} options={typeOptions} />
            </label>
            <label>
                Status
                <MultiSelectDropdown<GroceryStatus> onChange={props.chooseStatus} options={statusOptions} />
            </label>
        </div>

        <div className=" filter-row tag-filters">
            {groceryTags.map((tag, index) => <Tag key={index} name={tag} onSelect={props.toggleFilter} />)}
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

import { GroceryStatus, GroceryType } from '../../models/Models';
import { Tag } from '../Tag';
// import { groceryTags as groceryTags } from '../../groceryTags';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MultiSelectDropdown from '../../MultiSelectDropdown';
import { getAllTags } from '../../api';

export function GroceryFilters(props) {
	const [showFilters, setShowFilters] = useState(false);
	const [groceryTags, setGroceryTags] = useState([]);

	useEffect(() => {
		getAllTags().then((tags) => {
			setGroceryTags(tags);
		});
	}, []);

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
				<MultiSelectDropdown onChange={props.chooseType} options={typeOptions} />
			</label>
			<label>
				Status
				<MultiSelectDropdown onChange={props.chooseStatus} options={statusOptions} />
			</label>
		</div>

		<div className="filter-row tag-filters">
			{groceryTags.map((tag, index) => <Tag key={index} tag={tag} onSelect={props.toggleFilter} />)}
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

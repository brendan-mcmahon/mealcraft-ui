import { useEffect, useState } from 'react';
import { getAllGroceries as getAllGroceries } from '../../api';
import { GroceryForm } from './GroceryForm';
import "./GroceriesPage.scss";
import { GroceryListItem } from './GroceryListItem';
import { GroceryFilters } from './GroceryFilters';
import Loading from '../../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GrocerySearch } from './GrocerySearch';

export default function GroceriesPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedGrocery, setSelectGrocery] = useState(null);
	const [groceriesList, setGroceriesList] = useState([]);
	const [displayGroceries, setDisplayGroceries] = useState([]);
	const [sortBy, setSortBy] = useState('name');
	const [sortDirection, setSortDirection] = useState(1);
	const [filters, setFilters] = useState([]);
	const [statusFilter, setStatusFilter] = useState([]);
	const [typeFilters, setTypeFilters] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		getAllGroceries()
			.then(data => {
				setGroceriesList(data);
				setDisplayGroceries(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error('Error:', error);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => filterList(),
		[filters, statusFilter, typeFilters, groceriesList, searchTerm, sortBy, sortDirection]);

	const handleNewGrocerySaved = (grocery) => {
		const index = groceriesList.findIndex((t) => t.id === grocery.id);
		const newList = [...groceriesList];
		if (index === -1) {
			newList.push(grocery);
		} else {
			newList[index] = grocery;
		}
		setGroceriesList([...newList]);
		setSelectGrocery(null);
	};

	const handleGroceryDeleted = (grocery) => {
		const newList = [...groceriesList.filter((t) => t.id !== grocery.id)];
		setGroceriesList(newList);
		setSelectGrocery(null);
	};

	const selectGroceryToEdit = (grocery) => {
		setSelectGrocery(grocery);
	};

	const toggleFilter = (name, checked) => {
		if (checked) {
			setFilters([...filters, name]);
		} else {
			setFilters(filters.filter((t) => t !== name));
		}
	};

	const chooseType = (values) => {
		setTypeFilters([...values]);
	}

	const chooseStatus = (values) => {
		setStatusFilter([...values]);
	};

	const onSearchTermChanged = (e) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);
	};

	const openEditModal = () => {
		setSelectGrocery({
			name: searchTerm,
			id: '',
			type: 'Food',
			tags: [],
			status: 'Plenty',
			statusDate: null,
			expirationDate: null,
			location: null,
		});
	}

	let header = null;
	let body = null;
	if (isLoading) {
		body = <div className="loading-state"><Loading /><span>Loading Groceries...</span></div>;
	} else {
		header = (
			<div className="page-header">
				<div className="search-bar">
					<GrocerySearch searchTerm={searchTerm} onSearchTermChanged={onSearchTermChanged} setSearchTerm={setSearchTerm} />
					<button className="icon-button add-button" onClick={openEditModal}><FontAwesomeIcon icon={faPlus} /></button>
				</div>
				<GroceryFilters
					toggleFilter={toggleFilter}
					chooseType={chooseType}
					chooseStatus={chooseStatus}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortDirection={sortDirection}
					setSortDirection={setSortDirection}
				/>
			</div>);

		body = displayGroceries.length > 0 ? (
			<div className="groceries-list">
				{displayGroceries.map((grocery, index) => (
					<GroceryListItem key={index} grocery={grocery} onClick={selectGroceryToEdit} />
				))}
			</div>
		) : (
			<div className="empty-state">
				<span>No grocery items found!</span>
			</div>
		)
	}

	return (
		<div id="Groceries">
			{header}
			{!!selectedGrocery && <GroceryForm
				isOpen={!!selectedGrocery}
				handleCancel={() => setSelectGrocery(null)}
				onSaveComplete={handleNewGrocerySaved}
				onDelete={handleGroceryDeleted}
				grocery={selectedGrocery}
			/>}

			{body}
		</div>
	);

	function filterList() {
		let newDisplay = [...groceriesList];
		if (filters.length > 0) {
			newDisplay = newDisplay.filter(grocery =>
				filters.every(filter => grocery.tags.map(t => t.label).includes(filter)));
		}
		if (statusFilter.length > 0) {
			newDisplay = newDisplay.filter(grocery => statusFilter.includes(parseInt(grocery.status)));
		}
		if (typeFilters.length > 0) {
			newDisplay = newDisplay.filter(grocery => typeFilters.includes(parseInt(grocery.type)));
		}
		if (searchTerm !== '') {
			newDisplay = newDisplay.filter(grocery =>
				grocery.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		sortItems(newDisplay);

		setDisplayGroceries(newDisplay);
	}

	function sortItems(newDisplay) {
		switch (sortBy) {
			case 'name':
				newDisplay.sort((a, b) => sortDirection * a.name.localeCompare(b.name));
				break;
			case 'status-date':
				newDisplay.sort((a, b) => {
					if (a.statusDate === null) return sortDirection;
					if (b.statusDate === null) return -sortDirection;
					return sortDirection * (new Date(a.statusDate).getTime() - new Date(b.statusDate).getTime());
				});
				break;
			case 'type':
				newDisplay.sort((a, b) => a.type.localeCompare(b.type));
				break;
			default:
				break;
		}
	}
}

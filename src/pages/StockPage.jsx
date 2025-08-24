import { useEffect, useState } from 'react';
import { getAllGroceries, saveGrocery } from '../api';
import { GroceryStatus, GroceryType, LocationNames, LocationSortOrder } from '../models/Models';
import './StockPage.scss';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Tag } from './Tag';
import { timeAgo } from './utilities';

export default function StockPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [itemsList, setItemsList] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentItem, setCurrentItem] = useState(null);
	const [tagFilters, setTagFilters] = useState([]);
	const [typeFilters, setTypeFilters] = useState([]);

	useEffect(() => {
		getAllGroceries()
			.then((data) => {
				const metaItems = data
					.sort((a, b) => a.name.localeCompare(b.name))
					.sort((a, b) => {
						// const locationA = Location[parseInt(a.location)];
						// const locationB = Location[parseInt(b.location)];
						const locationSortOrderA = LocationSortOrder.indexOf(parseInt(a.location));
						const locationSortOrderB = LocationSortOrder.indexOf(parseInt(b.location));
						console.log(locationSortOrderA, locationSortOrderB);

						if (locationSortOrderA === locationSortOrderB) {
							// console.log("same:", a.name, b.name);
							return a.name.localeCompare(b.name);
						}
						// console.log("diff:", a.name, b.name, locationSortOrderA, locationSortOrderB);
						return locationSortOrderA - locationSortOrderB;
					})
					.map((item) => ({
						inventoried: false,
						item: item,
					}));
				setItemsList(metaItems);
				setFilteredItems(metaItems);
				setIsLoading(false);
				setCurrentItem(metaItems[0]);
			})
			.catch((error) => {
				console.error('Error:', error);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		let newFilteredItems = itemsList;

		if (tagFilters.length > 0) {
			newFilteredItems = newFilteredItems.filter((item) =>
				tagFilters.every((filter) => item.item.tags.map(t => t.label).includes(filter))
			);
		}

		if (typeFilters.length > 0) {
			newFilteredItems = newFilteredItems.filter((item) =>
				typeFilters.includes(item.item.type)
			);
		}

		setFilteredItems(newFilteredItems);
		setCurrentItem(newFilteredItems.find((i) => !i.inventoried) || null);
	}, [tagFilters, typeFilters, itemsList]);

	const saveStatus = async (status) => {
		if (!currentItem) return;

		const updatedItem = {
			...currentItem,
			inventoried: true,
			item: {
				...currentItem.item,
				status: status,
				statusDate: new Date(),
			},
		};

		await saveGrocery(updatedItem.item);

		const newList = [...filteredItems];
		newList[currentIndex] = updatedItem;

		setFilteredItems(newList);
		nextItem();
	};

	const nextItem = () => {
		if (currentIndex < filteredItems.length - 1) {
			setCurrentIndex(currentIndex + 1);
			setCurrentItem(filteredItems[currentIndex + 1]);
		}
	};

	const previousItem = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
			setCurrentItem(filteredItems[currentIndex - 1]);
		}
	};

	const filterStaples = (_, checked) => {
		if (checked) {
			setTagFilters([...tagFilters, "staple"]);
		} else {
			setTagFilters(tagFilters.filter((tag) => tag !== "staple"));
		}
	};

	const filterFood = (_, checked) => {
		if (checked) {
			setTypeFilters([...typeFilters, GroceryType.Food]);
		} else {
			setTypeFilters(typeFilters.filter((type) => type !== GroceryType.Food));
		}
	};

	let body = null;
	if (isLoading || !currentItem) {
		body = <Loading />;
	} else {
		const currentStatus = GroceryStatus[currentItem.item.status];
		const currentExpiration = timeAgo(currentItem.item.expirationDate);
		const currentUpdatedDate = timeAgo(currentItem.item.statusDate);

		body = (
			<div id="StockPage">
				<h4 className="inventoried-count">
					{filteredItems.filter((i) => i.inventoried).length}/{filteredItems.length}{' '}
					items inventoried
				</h4>

				<div className="filters">
					<Tag tag={{ label: "staple" }} onSelect={filterStaples} />
					<Tag tag={{ label: "food" }} onSelect={filterFood} />
				</div>

				<div className="item-header">
					<button className="icon-button" onClick={() => previousItem()}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>

					<div className="item-info-container">
						<div className="item-info">
							<h2 className="item-name">{currentItem?.item.name}</h2>
							<div className="details">
								<div className={`status ${currentStatus}`}>
									{currentStatus} since {currentUpdatedDate}
								</div>
								<div>{`${LocationNames[currentItem.item.location]}`}</div>
								{currentItem.item.expirationDate && <div className="expiration">Expires {currentExpiration}</div>}
							</div>
						</div>
					</div>
					<button className="icon-button" onClick={() => nextItem()}>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>
				<div className="status-buttons">
					<button
						className={`status-button plenty`}
						onClick={() => saveStatus(GroceryStatus.Plenty)}
					>
						Plenty
					</button>
					<button
						className={`status-button low`}
						onClick={() => saveStatus(GroceryStatus.Low)}
					>
						Low
					</button>
					<button
						className={`status-button out`}
						onClick={() => saveStatus(GroceryStatus.Out)}
					>
						Out
					</button>
				</div>
			</div>
		);
	}

	return body;
}

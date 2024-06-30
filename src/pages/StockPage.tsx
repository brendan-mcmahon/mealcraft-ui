import { useEffect, useState } from 'react';
import { getAllGroceries, updateGrocery } from '../api';
import { Grocery, GroceryStatus, GroceryType, LocationNames, LocationSortOrder } from '../Grocery';
import './StockPage.scss';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Tag } from './Tag';
import { timeAgo } from './utilities';

type InventoryItem = {
  inventoried: boolean;
  item: Grocery;
};

export default function StockPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [itemsList, setItemsList] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<GroceryType[]>([]);

  useEffect(() => {
    getAllGroceries()
      .then((data) => {
        const metaItems = data
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => {
            const locationA = LocationSortOrder.indexOf(a.location);
            const locationB = LocationSortOrder.indexOf(b.location);

            if (locationA === locationB) {
              return a.name.localeCompare(b.name);
            }
            return locationA - locationB;
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
        tagFilters.every((filter) => item.item.tags.includes(filter))
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

  const saveStatus = async (status: GroceryStatus) => {
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

    await updateGrocery(updatedItem.item);

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

  const filterStaples = (_: string, checked: boolean) => {
    if (checked) {
      setTagFilters([...tagFilters, "staple"]);
    } else {
      setTagFilters(tagFilters.filter((tag) => tag !== "staple"));
    }
  };

  const filterFood = (_: string, checked: boolean) => {
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
          <Tag name="Staples" onSelect={filterStaples} />
          <Tag name="Food" onSelect={filterFood} />
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

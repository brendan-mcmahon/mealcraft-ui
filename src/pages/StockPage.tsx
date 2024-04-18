import { useEffect, useState } from 'react'
import { getAllIngredients, updateIngredient } from '../api'
import { Ingredient, IngredientStatus, IngredientType } from '../Ingredient'
import './StockPage.scss'
import Loading from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Tag } from './Tag'

type InventoryItem = {
  inventoried: boolean
  item: Ingredient
}

export default function StockPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [itemsList, setItemsList] = useState<InventoryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null)
  const [tagFilters, setTagFilters] = useState<string[]>([])
  const [typeFilters, setTypeFilters] = useState<IngredientType[]>([])

  useEffect(() => {
    getAllIngredients()
      .then((data) => {
        const metaItems = data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            return {
              inventoried: false,
              item: item,
            }
          })
        setItemsList(metaItems)
        setFilteredItems(metaItems)
        setIsLoading(false)
        setCurrentItem(metaItems[0])
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (tagFilters.length === 0 && typeFilters.length === 0) {
      setFilteredItems(itemsList)
      setCurrentItem(itemsList.filter(i => !i.inventoried)[0])
    }
    if (tagFilters.length > 0) {
      const newFilteredItems = filteredItems.filter((item) => item.item.tags.includes("staple"));
      setFilteredItems(newFilteredItems)
      setCurrentItem(newFilteredItems.filter(i => !i.inventoried)[0])
    }
    if (typeFilters.length > 0) {
      const newFilteredItems = filteredItems.filter((item) => item.item.type === IngredientType.Food);
      setFilteredItems(newFilteredItems);
      setCurrentItem(newFilteredItems.filter(i => !i.inventoried)[0])
    }
  }, [tagFilters, typeFilters])

  const saveStatus = async (status: IngredientStatus) => {
    if (!currentItem) return

    const updatedItem = {
      ...currentItem,
      inventoried: true,
      item: {
        ...currentItem.item,
        status: status,
        statusDate: new Date(),
      },
    }

    await updateIngredient(updatedItem.item)

    const newList = [...filteredItems]
    newList[currentIndex] = updatedItem

    setFilteredItems(newList)
    nextItem()
  }

  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentItem(filteredItems[currentIndex + 1])
    }
  }

  const previousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCurrentItem(filteredItems[currentIndex - 1])
    }
  }

  const filterStaples = (_: string, checked: boolean) => {
    if (checked) {
      setTagFilters(["staple"])
    } else {
      setTagFilters([])
    }
  }

  const filterFood = (_: string, checked: boolean) => {
    if (checked) {
      setTypeFilters([IngredientType.Food])
    } else {
      setTypeFilters([])
    }
  }

  let body = null
  if (isLoading || !currentItem) {
    body = <Loading />
  } else {
    const currentStatus = IngredientStatus[currentItem.item.status]
    const currentExpiration = timeAgo(currentItem.item.expirationDate)
    const currentUpdatedDate = timeAgo(currentItem.item.statusDate)

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
            onClick={() => saveStatus(IngredientStatus.Plenty)}
          >
            Plenty
          </button>
          <button
            className={`status-button low`}
            onClick={() => saveStatus(IngredientStatus.Low)}
          >
            Low
          </button>
          <button
            className={`status-button out`}
            onClick={() => saveStatus(IngredientStatus.Out)}
          >
            Out
          </button>
        </div>
      </div>
    )
  }

  return body
}

function timeAgo(inputDate: Date | null): string {
  if (inputDate === null) return 'never'

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const normalizedInputDate = new Date(inputDate)
  normalizedInputDate.setHours(0, 0, 0, 0)

  const timeDifference = now.getTime() - normalizedInputDate.getTime()
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if (daysDifference === 0) return 'today'
  else if (daysDifference === 1) return 'yesterday'
  else if (daysDifference <= 7) return `${daysDifference} days ago`
  else if (daysDifference <= 14) return 'over a week ago'
  else if (daysDifference <= 21) return 'over 2 weeks ago'
  else if (daysDifference <= 28) return 'over 3 weeks ago'
  else if (daysDifference <= 32) return 'over a month ago'
  else {
    const months = Math.floor(daysDifference / 30)
    return `over ${months} months ago`
  }
}

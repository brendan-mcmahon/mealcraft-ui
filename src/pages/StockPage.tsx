import { useEffect, useState } from 'react'
import { getAllIngredients, updateIngredient } from '../api'
import { Ingredient, IngredientStatus, IngredientType } from '../Ingredient'
import './StockPage.scss'
import Loading from '../Loading'

type InventoryItem = {
  inventoried: boolean
  item: Ingredient
}

export default function StockPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [itemsList, setItemsList] = useState<InventoryItem[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null)

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
        setIsLoading(false)
        setCurrentItem(metaItems[0])
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      })
  }, [])

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

    const newList = [...itemsList]
    newList[currentIndex] = updatedItem
    setItemsList(newList)
    nextItem()
  }

  const nextItem = () => {
    if (currentIndex < itemsList.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentItem(itemsList[currentIndex + 1])
    }
  }

  let body = null
  if (isLoading || !currentItem) {
    body = (
      <div className="loading-state">
        <Loading />
        <span>Loading Groceries...</span>
      </div>
    )
  } else {
    const currentStatus = IngredientStatus[currentItem.item.status]
    const currentType = IngredientType[currentItem.item.type]
    const currentExpiration = timeAgo(currentItem.item.expirationDate)
    const currentUpdatedDate = timeAgo(currentItem.item.statusDate)

    body = (
      <div id="StockPage">
        <h4 className="inventoried-count">
          {itemsList.filter((i) => i.inventoried).length}/{itemsList.length}{' '}
          items inventoried
        </h4>
        <div className="item-info-container">
          <div className="item-info">
            <h2 className="item-name">{currentItem?.item.name}</h2>
            <div className="details">
              <div className={`status ${currentStatus}`}>
                {currentStatus} since {currentUpdatedDate}
              </div>
              {/* <div className="type">{currentType}</div> */}
              <div className="expiration">Expires {currentExpiration}</div>
            </div>
          </div>
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
          <button className={`status-button skip`} onClick={() => nextItem()}>
            Skip
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

  console.log(daysDifference)

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

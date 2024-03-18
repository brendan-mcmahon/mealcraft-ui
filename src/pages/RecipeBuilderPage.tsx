import React, { useState, useEffect } from 'react'
import Loading from '../Loading'
import { getAllIngredients } from '../api'
import { Ingredient, Recipe } from '../Ingredient'

export default function RecipeBuilderPage() {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe)
  const [isLoading, setIsLoading] = useState(true)
  const [itemsList, setItemsList] = useState<Ingredient[]>([])
  const [selectedIngredientId, setSelectedIngredientId] = useState<
    string | null
  >(null)

  useEffect(() => {
    getAllIngredients()
      .then((data) => {
        const metaItems = data.sort((a, b) => a.name.localeCompare(b.name))
        setItemsList(metaItems)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      })
  }, [])

  const handleAddIngredient = () => {
    console.log('handleAddIngredient', selectedIngredientId)
    if (!selectedIngredientId) return
    const ingredient = itemsList.find(
      (i) => i.ingredientId === selectedIngredientId,
    )
    if (!ingredient) return
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { ingredientId: ingredient.ingredientId, amount: 1, unit: 'unit' },
      ],
    })
  }

  const handleRemoveIngredient = (ingredientId: string) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(
        (i) => i.ingredientId !== ingredientId,
      ),
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <h2>Recipe Builder</h2>
      <pre>{JSON.stringify(recipe)}</pre>
      <div>
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={recipe.description}
            onChange={(e) =>
              setRecipe({ ...recipe, description: e.target.value })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Add Ingredient:
          <select
            value={selectedIngredientId ?? ''}
            onChange={(e) => setSelectedIngredientId(e.target.value)}
          >
            <option value="">Select an ingredient</option>
            {itemsList.map((ingredient) => (
              <option
                key={ingredient.ingredientId}
                value={ingredient.ingredientId}
              >
                {ingredient.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddIngredient}>Add</button>
        </label>
      </div>
      <div>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients?.map((ingredient) => (
            <li key={ingredient.ingredientId}>
              {
                itemsList.filter(
                  (i) => i.ingredientId === ingredient.ingredientId,
                )[0].name
              }
              <button
                onClick={() => handleRemoveIngredient(ingredient.ingredientId)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// return <div>Recipe Builder

//     <pre>{JSON.stringify(recipe)}</pre>

//     <form>
//         <label>Recipe Name<input type="text" onChange={e => setRecipe({...recipe, name: e.target.value})}></input></label>
//         <label>Description<input type="text"></input></label>
//         <input type="text"></input>

//         <input type="submit"></input>
//     </form>

// </div>

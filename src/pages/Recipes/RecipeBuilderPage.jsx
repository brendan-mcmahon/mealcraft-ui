import { useState, useEffect } from 'react'
import Loading from '../../Loading'
import { getAllGroceries } from '../../api'
import { GroceryType } from '../../models/Models'

const emptyRecipe = {
	name: '',
	ingredients: [],
	recipeId: '',
	description: '',
	instructions: []
}

export default function RecipeBuilderPage() {
	const [recipe, setRecipe] = useState(emptyRecipe)
	const [isLoading, setIsLoading] = useState(true)
	const [itemsList, setItemsList] = useState([])
	const [selectedIngredientId, setSelectedIngredientId] = useState(null)

	useEffect(() => {
		getAllGroceries()
			.then((data) => {
				const metaItems = data.sort((a, b) => a.name.localeCompare(b.name))
				setItemsList(metaItems.filter(i => i.type === GroceryType.Food))
				setIsLoading(false)
			})
			.catch((error) => {
				console.error('Error:', error)
				setIsLoading(false)
			})
	}, [])

	const handleAddIngredient = (ingredientId) => {
		if (!ingredientId) return
		const ingredient = itemsList.find(
			(i) => i.ingredientId === ingredientId,
		)
		if (!ingredient) return
		setRecipe({
			...recipe,
			ingredients: [
				...recipe.ingredients,
				{ ingredientId: ingredient.ingredientId, amount: 1, unit: 'unit' },
			],
		})
		setSelectedIngredientId(null)
	}

	const handleRemoveIngredient = (ingredientId) => {
		setRecipe({
			...recipe,
			ingredients: recipe.ingredients.filter(
				(i) => i.ingredientId !== ingredientId,
			),
		})
	}

	if (isLoading) { return <Loading /> }

	return (
		<div>
			<h2>Recipe Builder</h2>
			<pre>{JSON.stringify(recipe)}</pre>
			<label className="form-input">
				Recipe Name:
				<input
					type="text"
					value={recipe.name}
					onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
				/>
			</label>
			<label className="form-input">
				Description:
				<textarea
					value={recipe.description}
					onChange={(e) =>
						setRecipe({ ...recipe, description: e.target.value })
					}
				/>
			</label>
			<label className="form-input">
				Add Ingredient:
				<select
					value={selectedIngredientId ?? ''}
					onChange={(e) => handleAddIngredient(e.target.value)}
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
				<button onClick={() => console.log('add new')}>New</button>
			</label>
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

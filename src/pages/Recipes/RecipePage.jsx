import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../../api';
import RecipeIngredients from './Ingredients/RecipeIngredients';
import './RecipePage.scss';
import RecipeInstructions from './Instructions/RecipeInstructions';
import AddIngredientModal from './Ingredients/AddIngredientModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddInstructionModal from './Instructions/AddInstructionModal';

const RecipePage = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get('id');

	const [recipe, setRecipe] = useState({
		recipeId: '',
		name: 'Enter recipe name',
		description: 'Enter recipe description',
		ingredients: [],
		instructions: []
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
	const [showAddInstructionModal, setShowAddInstructionModal] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const addIngredient = (ingredient) => {
		setRecipe(oldRecipe => {
			if (!oldRecipe.ingredients) {
				oldRecipe.ingredients = [];
			}
			return {
				...oldRecipe,
				ingredients: [
					...oldRecipe.ingredients,
					ingredient
				]
			}

		});
	}

	const addInstruction = (instruction) => {
		setRecipe(oldRecipe => {
			if (!oldRecipe.instructions) {
				oldRecipe.instructions = [];
			}
			return {
				...oldRecipe,
				instructions: [
					...oldRecipe.instructions,
					{
						text: instruction,
						stepnumber: oldRecipe.instructions.length + 1
					}
				]
			}
		});
	}

	const removeIngredient = (ingredientId) => {
		setRecipe(oldRecipe => {
			return {
				...oldRecipe,
				ingredients: oldRecipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)
			}
		});
	}

	const removeInstruction = (instructionText) => {
		setRecipe(oldRecipe => {
			return {
				...oldRecipe,
				instructions: oldRecipe.instructions.filter(instruction => instruction.text !== instructionText)
			}
		});
	}

	const setInstructionsOrder = (newOrder) => {
		setRecipe(oldRecipe => ({
			...oldRecipe,
			instructions: newOrder.map((text, index) => ({
				...oldRecipe.instructions.find(i => i.text === text),
				stepnumber: index + 1
			}))
		}));
	};

	const setIngredientsOrder = (newOrder) => {
		setRecipe(oldRecipe => ({
			...oldRecipe,
			ingredients: newOrder.map(id => oldRecipe.ingredients.find(i => i.id === id))
		}));
	};


	useEffect(() => {
		if (!id) {
			setIsLoading(false);
			setError(false);
			setEditMode(true);
		} else {
			getRecipe(id)
				.then(data => {
					setRecipe(data);
					setIsLoading(false);
					setError(false);
				})
				.catch(error => {
					console.error('Error:', error);
					setIsLoading(false);
					setError(true);
				});
		}
	}, []);

	const save = () => {
		updateRecipe(recipe)
			.then(() => {
				setEditMode(false);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	if (isLoading || !recipe) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Recipe not found</div>;
	}

	return (<>
		<div id="Recipe">
			<div className="header">
				<div></div>
				<div className="title">
					{!editMode && <h1>{recipe.name}
						<FontAwesomeIcon onClick={() => setEditMode(true)} icon={faPencil} />
					</h1>}

					{editMode && <input type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} />}

					{!editMode && <p className="description">{recipe.description}</p>}
					{editMode && <textarea value={recipe.description} onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} />}
				</div>
			</div>
			{editMode && <div className="edit-buttons">
				<button onClick={() => setEditMode(false)}>Cancel</button>
				<button onClick={save} >Save</button>
			</div>}
			<h2 className="section-title">Ingredients</h2>
			<div className="ingredients recipe-list">
				<RecipeIngredients
					ingredients={recipe.ingredients}
					setIngredients={setIngredientsOrder}
					editMode={editMode}
					removeIngredient={removeIngredient}
				/>
				{editMode && <FontAwesomeIcon className="add-button" onClick={() => setShowAddIngredientModal(true)} icon={faPlusCircle} />}
			</div>

			<h2 className="section-title">Instructions</h2>
			<div className="instructions recipe-list">
				<RecipeInstructions
					instructions={recipe.instructions}
					editMode={editMode}
					removeInstruction={removeInstruction}
					setInstructions={setInstructionsOrder}
				/>
				{editMode && <FontAwesomeIcon className="add-button" onClick={() => setShowAddInstructionModal(true)} icon={faPlusCircle} />}
			</div>
		</div>
		<AddIngredientModal
			handleAddIngredient={addIngredient}
			isOpen={showAddIngredientModal}
			onClose={() => setShowAddIngredientModal(false)}
		/>
		<AddInstructionModal
			handleAddInstruction={addInstruction}
			isOpen={showAddInstructionModal}
			onClose={() => setShowAddInstructionModal(false)}
		/>
	</>
	);
};

export default RecipePage;
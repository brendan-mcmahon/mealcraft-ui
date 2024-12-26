import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../../api';
import RecipeIngredientListItem from './RecipeIngredientListItem';
import './RecipePage.scss';
// import RecipeInstructionListItem from './RecipeInstructionListItem';
import RecipeInstructions from './RecipeInstructions';
import AddIngredientModal from './AddIngredientModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddInstructionModal from './AddInstructionModal';

const RecipePage = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get('id');

	const [recipe, setRecipe] = useState({
		recipeId: '',
		name: '',
		description: '',
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
		console.log("adding instruction")
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
				...oldRecipe.instructions.find(i => i.text === text), // Find the original instruction
				stepnumber: index + 1 // Update step numbers
			}))
		}));
	};


	useEffect(() => {
		if (!id) {
			setError(true);
			return;
		}
		getRecipe(id)
			.then(data => {
				console.log(data);
				setRecipe(data);
				console.log("setting isLoading to false");
				setIsLoading(false);
				setError(false);
			})
			.catch(error => {
				console.error('Error:', error);
				setIsLoading(false);
				setError(true);
			});
	}, []);

	const save = () => {
		console.log("saving recipe", recipe);
		updateRecipe(recipe)
			.then(data => {
				console.log(data);
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
			<h1 className="title">{recipe.name}
				{!editMode && <FontAwesomeIcon onClick={() => setEditMode(true)} icon={faPencil} />}
			</h1>
			<p className="description">{recipe.description}</p>
			<div className="ingredients">
				<h2>Ingredients</h2>
				<ul>
					{recipe.ingredients?.map((ingredient, index) =>
						<RecipeIngredientListItem key={index} ingredient={ingredient} editMode={editMode} removeIngredient={() => removeIngredient(ingredient.id)} />
					)}
				</ul>
				{editMode && <FontAwesomeIcon className="add-button" onClick={() => setShowAddIngredientModal(true)} icon={faPlusCircle} />}
			</div>

			<div className="instructions">
				<RecipeInstructions
					instructions={recipe.instructions}
					editMode={editMode}
					removeInstruction={removeInstruction}
					setInstructions={setInstructionsOrder}
				/>
				{/* <h2>Instructions</h2>
				<ol>
					{recipe.instructions?.map((instruction, index) =>
						<RecipeInstructionListItem key={index} instruction={instruction} editMode={editMode} removeInstruction={() => removeInstruction(instruction.text)} />
					)}
				</ol>
				{editMode && <FontAwesomeIcon className="add-button" onClick={() => setShowAddInstructionModal(true)} icon={faPlusCircle} />} */}
			</div>
			{editMode && <div className="edit-buttons">
				<button onClick={() => setEditMode(false)}>Cancel</button>
				<button onClick={save} >Save</button>
			</div>}
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
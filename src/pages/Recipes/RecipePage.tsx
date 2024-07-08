import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Recipe } from '../../Models';
import { getRecipe } from '../../api';
import RecipeIngredientListItem from './RecipeIngredientListItem';
import './RecipePage.scss';
import RecipeInstructionListItem from './RecipeInstructionListItem';
import AddIngredientModal from './AddIngredientModal';

const RecipePage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);
    const [showAddIngredientModal, setShowAddIngredientModal] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            setError(true);
            return;
        }
        getRecipe(id)
            .then(data => {
                console.log(data);
                setRecipe(data);
                setIsLoading(false);
                setError(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setError(true);
            });
    }, []);

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    if (isLoading || !recipe) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Recipe not found</div>;
    }

    return (<>
        <div id="Recipe">
            <h1 className="title">{recipe.name}</h1>
            <p className="description">{recipe.description}</p>
            <div className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) =>
                        <RecipeIngredientListItem key={index} ingredient={ingredient} />
                    )}
                </ul>
                <button onClick={() => setShowAddIngredientModal(true)}>Add Ingredient</button>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <ol>
                    {recipe.instructions.map((instruction, index) =>
                        <RecipeInstructionListItem key={index} instruction={instruction} />
                    )}
                </ol>
            </div>
        </div>
        <AddIngredientModal
            handleAddIngredient={() => console.log('Add ingredient')}
            isOpen={showAddIngredientModal}
            onClose={() => setShowAddIngredientModal(false)}
        />
    </>
    );
};

export default RecipePage;
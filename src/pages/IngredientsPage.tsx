import { useEffect, useState } from 'react';
import { getAllIngredients, Ingredient } from '../api';
import { NewIngredientForm } from './NewIngredientForm';
import "./IngredientsPage.scss";
import { IngredientListItem } from './IngredientListItem';

export default function IngredientsPage() {
    const [isAdding, setIsAdding] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

    useEffect(() => {
        getAllIngredients()
            .then(data => {
                setIngredientsList(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleNewIngredientSaved = (ingredient: Ingredient) => {
        setIngredientsList([...ingredientsList, ingredient]);
        setIsAdding(false);
    };

    return (
        <div id="Ingredients">
            <div className="page-header">
                <h1 className="page-title">Ingredients</h1>
                <button onClick={() => setIsAdding(true)}>+</button>
            </div>

            <NewIngredientForm
                isOpen={isAdding}
                handleCancel={() => setIsAdding(false)}
                onSaveComplete={handleNewIngredientSaved}
            />

            <div className="ingredients-list">
                {ingredientsList.map((ingredient, index) => (
                    <IngredientListItem key={index} ingredient={ingredient}/>
                ))}
            </div>

            {/* <div>
                {ingredientsList.map((ingredient, index) => (
                    <SwipeableItem key={index} text={ingredient.name} />
                ))}
            </div> */}
        </div>
    );
}

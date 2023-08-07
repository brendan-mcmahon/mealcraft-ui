import { useEffect, useState } from 'react';
import { getAllIngredients, Ingredient } from '../api';
import { NewIngredientForm } from './NewIngredientForm';
import "./IngredientsPage.scss";
import { IngredientListItem } from './IngredientListItem';

export default function IngredientsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

    useEffect(() => {
        getAllIngredients()
            .then(data => {
                setIngredientsList(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    const handleNewIngredientSaved = (ingredient: Ingredient) => {
        setIngredientsList([...ingredientsList, ingredient]);
        setIsAdding(false);
    };

    let body = null;
    if (isLoading) {
        body = <div>Loading...</div>;
    } else {
        body = (
            <div className="ingredients-list">
                {ingredientsList.map((ingredient, index) => (
                    <IngredientListItem key={index} ingredient={ingredient} />
                ))}
            </div>
        );
    }

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

            {body}
        </div>
    );
}

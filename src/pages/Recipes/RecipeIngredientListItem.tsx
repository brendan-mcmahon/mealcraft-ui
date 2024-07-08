import { useState } from 'react';
import Checkbox from '../../Checkbox';
import { RecipeIngredient } from '../../Models';

interface RecipeIngredientListItemProps {
    ingredient: RecipeIngredient;
}

const RecipeIngredientListItem = ({ ingredient }: RecipeIngredientListItemProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const style = { textDecoration: isChecked ? "line-through" : "none" };

    return (
        <li className="ingredient-container">
            <label className="ingredient">
                <Checkbox onCheck={() => setIsChecked(!isChecked)} />
                <span style={style} >{ingredient.ingredient.name}</span>
            </label>
        </li>
    );
};

export default RecipeIngredientListItem;
import { useState } from 'react';
import Checkbox from '../../Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RecipeIngredientListItem = ({ ingredient, editMode, removeIngredient }) => {
	const [isChecked, setIsChecked] = useState(false);

	const style = { textDecoration: isChecked ? "line-through" : "none" };

	return (
		<li className="list-item-container">
			<label className="list-item">
				{!editMode && <Checkbox onCheck={() => setIsChecked(!isChecked)} />}
				<span style={style} className="quantity">{ingredient.amount} {ingredient.unit}</span>
				<span style={style}>{ingredient.name}</span>
				{editMode && <FontAwesomeIcon onClick={removeIngredient} className="delete" icon={faXmark} />}
			</label>
		</li>
	);
};

export default RecipeIngredientListItem;
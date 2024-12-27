import { useState, useEffect } from 'react';
import Loading from '../../../Loading';
import { getAllGroceries } from '../../../api';
import { GroceryType } from '../../../models/Models';
import Modal from '../../../Modal';
import Select from 'react-select';

const AddIngredientModal = (props) => {
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [unit, setUnit] = useState('unit');
	const [itemsList, setItemsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllGroceries()
			.then((data) => {
				const metaItems = data.sort((a, b) => a.name.localeCompare(b.name));
				setItemsList(metaItems.filter(i => parseInt(i.type) === GroceryType.Food));
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setIsLoading(false);
			});
	}, []);

	const handleSave = (e) => {
		e.preventDefault();
		if (!selectedIngredient) return;
		const ingredientEntity = {
			groceryid: selectedIngredient.value.id,
			name: selectedIngredient.value.name,
			amount: quantity,
			unit: unit
		};
		props.handleAddIngredient(ingredientEntity);

		setSelectedIngredient(null);
		props.onClose();
	};

	if (isLoading) { return <Loading /> }

	return (
		<Modal title="Add Ingredient" isOpen={props.isOpen} onClose={props.onClose}>
			<form className="add-ingredient-form" onSubmit={handleSave}>
				<div className="form-input">
					<label>Ingredient:</label>
					<Select
						className="ingredient-select"
						options={itemsList}
						getOptionLabel={(ingredient) => ingredient.name}
						getOptionValue={(ingredient) => ingredient.id}
						menuPortalTarget={document.body}
						value={selectedIngredient?.value || null}
						onChange={(selectedOption) => setSelectedIngredient(selectedOption ? { value: selectedOption, label: selectedOption.name } : null)}
						placeholder="Select an ingredient"
						styles={{
							menuPortal: base => ({ ...base, zIndex: 4 }),
							menu: base => ({ ...base, zIndex: 4, color: 'black' }),
						}}
					/>
				</div>

				<div className="form-input">
					<label>Quantity:</label>
					<input
						type="number"
						value={quantity}
						step="0.25"
						onChange={(e) => setQuantity(parseFloat(e.target.value))}
					/>
				</div>

				<div className="form-input">
					<label>Unit:</label>
					<input
						type="text"
						value={unit}
						onChange={(e) => setUnit(e.target.value)}
					/>
				</div>

				<button type="submit">Save</button>
			</form>
		</Modal>
	);
};

export default AddIngredientModal;

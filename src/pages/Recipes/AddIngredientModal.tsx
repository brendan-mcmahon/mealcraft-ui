import { useState, FC, useEffect, FormEvent } from 'react';
import Loading from '../../Loading'
import { getAllGroceries } from '../../api'
import { Grocery, GroceryType, RecipeIngredientDto } from '../../Models'
import Modal from '../../Modal';

interface AddIngredientFormProps {
    handleAddIngredient: (ingredient: RecipeIngredientDto) => void;
    isOpen: boolean;
    onClose: () => void;
}

const AddIngredientModal: FC<AddIngredientFormProps> = (props) => {
    const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const [unit, setUnit] = useState<string>('unit')
    const [itemsList, setItemsList] = useState<Grocery[]>([])
    const [isLoading, setIsLoading] = useState(true)

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

    const handleSave = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!selectedIngredientId) return;
        props.handleAddIngredient({
            ingredientId: selectedIngredientId,
            amount: quantity,
            unit: unit
        });
    };

    if (isLoading) { return <Loading /> }

    return (<Modal title="Add Ingredient" isOpen={props.isOpen} onClose={props.onClose}>
        <form className="add-ingredient-form" onSubmit={handleSave}>
            <label className="form-input">
                Ingredient:
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
                <button type="submit">Save</button>
            </label>

            <label className="form-input">
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
            </label>

            <label className="form-input">
                Unit:
                <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />
            </label>
        </form>
    </Modal>
    );
};

export default AddIngredientModal;
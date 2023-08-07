import { useState } from 'react';
import { IngredientStatus, saveIngredient } from '../api';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../api';
import Modal from "../Modal";

type NewIngredientFormProps = {
    isOpen: boolean;
    onSaveComplete: (ingredient: Ingredient) => void;
    handleCancel: () => void;
};

export function NewIngredientForm(props: NewIngredientFormProps) {
    const [ingredient, setIngredient] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const addTag = (tag: string, checked: boolean) => {
        if (checked) {
            setTags([...tags, tag]);
        } else {
            setTags(tags.filter((t) => t !== tag));
        }
    };

    const handleSave = () => {
        const newIngredient = {
            name: ingredient,
            ingredientId: uuidv4(),
            tags: tags,
            status: IngredientStatus.Plenty
        };

        saveIngredient(newIngredient)
            .then((data) => {
                console.log(data);
                props.onSaveComplete(newIngredient);
                setIngredient('');
            })
            .catch((error) => console.log(error));

    };

    return (<Modal title="New Ingredient" isOpen={props.isOpen} onClose={props.handleCancel}>
        <input className="ingredient-input" value={ingredient} onChange={e => setIngredient(e.target.value)} type="text" placeholder="Ingredient name" />
        <div className='form-group tags'>
            <label htmlFor="food-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="food-tag" name="food-tag" value="food-tag" onChange={(e) => addTag("food", e.target.checked)} />
                <span className="chip-text">food</span>
            </label>
            <label htmlFor="spice-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="spice-tag" name="spice-tag" value="spice-tag" onChange={(e) => addTag("spice", e.target.checked)} />
                <span className="chip-text">spice</span>
            </label>
            <label htmlFor="condiment-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="condiment-tag" name="condiment-tag" value="condiment-tag" onChange={(e) => addTag("condiment", e.target.checked)} />
                <span className="chip-text">condiment</span>
            </label>
            <label htmlFor="kids-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="kids-tag" name="kids-tag" value="kids-tag" onChange={(e) => addTag("kids", e.target.checked)} />
                <span className="chip-text">kids</span>
            </label>
            <label htmlFor="staple-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="staple-tag" name="staple-tag" value="staple-tag" onChange={(e) => addTag("staple", e.target.checked)} />
                <span className="chip-text">staple</span>
            </label>
            <label htmlFor="snack-tag" className="chip">
                <input className="chip-checkbox" type="checkbox" id="snack-tag" name="snack-tag" value="snack-tag" onChange={(e) => addTag("snack", e.target.checked)} />
                <span className="chip-text">snack</span>
            </label>
        </div>
        <div className="buttons">
            <button onClick={handleSave}>Save</button>
        </div>
    </Modal>);
}

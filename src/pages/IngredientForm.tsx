import { useRef, useState, useEffect, FormEvent } from 'react';
import { saveIngredient, updateIngredient, deleteIngredient } from '../api';
import { IngredientStatus, IngredientType } from '../Ingredient';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../Ingredient';
import Modal from "../Modal";
import { Tag } from './Tag';
import { ingredientTags } from '../ingredientTags';
import Loading from '../Loading';

type IngredientFormProps = {
    isOpen: boolean;
    onSaveComplete: (ingredient: Ingredient) => void;
    onDelete: (ingredient: Ingredient) => void;
    handleCancel: () => void;
    ingredient: Ingredient | null;
};

export function IngredientForm(props: IngredientFormProps) {
    const [ingredientName, setIngredientName] = useState(props.ingredient?.name || '');
    const [groceryType, setGroceryType] = useState<number>(props.ingredient?.type || 0);
    const [tags, setTags] = useState<string[]>(props.ingredient?.tags || []);
    const [expirationDate, setExpirationDate] = useState<Date | null>(props.ingredient?.expirationDate || null);
    const input = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (props.isOpen && input.current) {
            setIngredientName(props.ingredient?.name || '');
            setGroceryType(props.ingredient?.type || 0);
            setExpirationDate(props.ingredient?.expirationDate || null);
            setTags(props.ingredient?.tags || []);
            input.current.focus();
        }
    }, [props.isOpen, props.ingredient]);

    const addTag = (tag: string, checked: boolean) => {
        if (checked) {
            setTags([...tags, tag]);
        } else {
            setTags(tags.filter((t) => t !== tag));
        }
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessing(true);

        if (props.ingredient) {
            saveEditIngredient(props.ingredient);
        } else {
            saveNewIngredient();
        }
    };

    function saveNewIngredient() {
        const newIngredient = {
            name: ingredientName,
            ingredientId: uuidv4(),
            type: groceryType as IngredientType,
            tags: tags,
            status: IngredientStatus.Plenty,
            statusDate: null,
            expirationDate: expirationDate
        };

        saveIngredient(newIngredient)
            .then(() => {
                props.onSaveComplete(newIngredient);
                setIsProcessing(false);
                setIngredientName('');
            })
            .catch((error) => {
                setIsProcessing(false);
                console.error(error);
            });
    }

    function saveEditIngredient(ingredient: Ingredient) {
        const newTags = tags.filter((t) => t !== "food" && t !== "hygiene" && t !== "cleaning");
        const updatedIngredient = {
            ...ingredient,
            ingredientId: ingredient?.ingredientId,
            status: ingredient?.status,
            statusDate: ingredient?.statusDate,
            type: groceryType as IngredientType,
            name: ingredientName,
            tags: newTags,
            expirationDate: expirationDate
        };

        updateIngredient(updatedIngredient)
            .then(() => {
                props.onSaveComplete(updatedIngredient);
                setIngredientName('');
                setIsProcessing(false);
            })
            .catch((error) => {
                setIsProcessing(false);
                console.error(error);
            });
        return;
    }

    const deleteThis = () => {
        if (props.ingredient) {
            deleteIngredient(props.ingredient.ingredientId)
                .then(() => {
                    props.onDelete(props.ingredient as Ingredient);
                    setIngredientName('');
                })
                .catch((error) => console.error(error));
        }
    }

    return (<Modal title={props.ingredient?.name || "New Ingredient"} isOpen={props.isOpen} onClose={props.handleCancel}>
        {isProcessing && <div className="loading"><Loading /><span>Saving...</span></div>}
        <form onSubmit={handleSave}>
            <div className="form-group name">
                <label>Name</label>
                <input
                    ref={input}
                    className="ingredient-input"
                    value={ingredientName}
                    onChange={e => setIngredientName(e.target.value)}
                    type="text"
                    placeholder="Ingredient name" />
            </div>

            <div className='form-group type'>
                <label>Type</label>
                <select className="ingredient-type" value={groceryType} onChange={e => setGroceryType(parseInt(e.target.value))}>
                    {
                        Object.keys(IngredientType)
                            .filter((key) => !isNaN(Number(key)))
                            .map((type) => (
                                <option key={type} value={parseInt(type)}>{IngredientType[parseInt(type)]}</option>
                            ))
                    }
                </select>
            </div>

            { groceryType === IngredientType.Food &&
                <div className="form-group expiration-date">
                    <label>Expiration Date</label>
                    <input
                        className="ingredient-input"
                        value={expirationDate ? expirationDate.toISOString().split('T')[0] : ''}
                        onChange={e => setExpirationDate(e.target.value ? new Date(e.target.value) : null)}
                        type="date"
                        placeholder="Expiration Date" />
                </div>
            }
            <div className="form-group tags">
                {ingredientTags.map((tag, index) => (
                    <Tag key={index} name={tag} onSelect={addTag} selected={props.ingredient?.tags.includes(tag)} />
                ))}
            </div>

            <div className="buttons">
                {!!props.ingredient && <button disabled={isProcessing} className="delete-button" onClick={deleteThis}>Delete</button>}
                <button disabled={isProcessing} type="submit">Save</button>
            </div>
        </form>
    </Modal>);
}

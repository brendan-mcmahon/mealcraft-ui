import { useRef, useState, useEffect, FormEvent } from 'react';
import { saveGrocery, updateGrocery, deleteGrocery } from '../../api';
import { GroceryStatus, GroceryType, Grocery, Location, LocationNames } from '../../Models';
import { v4 as uuidv4 } from 'uuid';
import Modal from "../../Modal";
import { Tag } from '../Tag';
import { groceryTags as groceryTags } from '../../groceryTags';
import Loading from '../../Loading';

type GroceryFormProps = {
    isOpen: boolean;
    onSaveComplete: (grocery: Grocery) => void;
    onDelete: (grocery: Grocery) => void;
    handleCancel: () => void;
    grocery: Grocery;
};

export function GroceryForm(props: GroceryFormProps) {
    const [groceryName, setGroceryName] = useState(props.grocery?.name || '');
    const [groceryType, setGroceryType] = useState<number>(props.grocery?.type || 0);
    const [groceryLocation, setGroceryLocation] = useState<number | null>(props.grocery?.location || Location.Pantry);
    const [tags, setTags] = useState<string[]>(props.grocery?.tags || []);
    const [expirationDate, setExpirationDate] = useState<Date | null>(props.grocery?.expirationDate || null);
    const input = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (props.isOpen && input.current) {
            setGroceryName(props.grocery?.name || '');
            setGroceryType(props.grocery?.type || 0);
            setExpirationDate(props.grocery?.expirationDate || null);
            setTags(props.grocery?.tags || []);
            input.current.focus();
        }
    }, [props.isOpen, props.grocery]);

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

        if (props.grocery.ingredientId) {
            saveEditGrocery(props.grocery);
        } else {
            saveNewGrocery();
        }
    };

    function saveNewGrocery() {
        const newGrocery = {
            name: groceryName,
            ingredientId: uuidv4(),
            type: groceryType as GroceryType,
            tags: tags,
            status: GroceryStatus.Plenty,
            statusDate: null,
            expirationDate: expirationDate,
            location: groceryLocation
        };

        saveGrocery(newGrocery)
            .then(() => {
                props.onSaveComplete(newGrocery);
                setIsProcessing(false);
                setGroceryName('');
            })
            .catch((error) => {
                setIsProcessing(false);
                console.error(error);
            });
    }

    function saveEditGrocery(grocery: Grocery) {
        const newTags = tags.filter((t) => t !== "food" && t !== "hygiene" && t !== "cleaning");
        const updatedGrocery = {
            ...grocery,
            ingredientId: grocery?.ingredientId,
            status: grocery?.status,
            statusDate: grocery?.statusDate,
            type: groceryType as GroceryType,
            name: groceryName,
            tags: newTags,
            expirationDate: expirationDate,
            location: groceryLocation
        };

        updateGrocery(updatedGrocery)
            .then(() => {
                props.onSaveComplete(updatedGrocery);
                setGroceryName('');
                setIsProcessing(false);
            })
            .catch((error) => {
                setIsProcessing(false);
                console.error(error);
            });
        return;
    }

    const deleteThis = () => {
        if (props.grocery) {
            deleteGrocery(props.grocery.ingredientId)
                .then(() => {
                    props.onDelete(props.grocery as Grocery);
                    setGroceryName('');
                })
                .catch((error) => console.error(error));
        }
    }

    return (<Modal title={props.grocery?.name || "New Grocery"} isOpen={props.isOpen} onClose={props.handleCancel}>
        {isProcessing && <div className="loading"><Loading /><span>Saving...</span></div>}
        <form onSubmit={handleSave}>
            <div className="form-group name">
                <label>Name</label>
                <input
                    ref={input}
                    className="grocery-input"
                    value={groceryName}
                    onChange={e => setGroceryName(e.target.value)}
                    type="text"
                    placeholder="Grocery name" />
            </div>

            <div className='form-group type'>
                <label>Type</label>
                <select className="grocery-type" value={groceryType} onChange={e => setGroceryType(parseInt(e.target.value))}>
                    {
                        Object.keys(GroceryType)
                            .filter((key) => !isNaN(Number(key)))
                            .map((type) => (
                                <option key={type} value={parseInt(type)}>{GroceryType[parseInt(type)]}</option>
                            ))
                    }
                </select>
            </div>

            {
                groceryType === GroceryType.Food &&
                <div className="form-group expiration-date">
                    <label>Expiration Date</label>
                    <input
                        className="grocery-input"
                        value={expirationDate ? expirationDate.toISOString().split('T')[0] : ''}
                        onChange={e => setExpirationDate(e.target.value ? new Date(e.target.value) : null)}
                        type="date"
                        placeholder="Expiration Date" />
                </div>
            }

            <div className='form-group location'>
                <label>Location</label>
                <select className="grocery-location" value={groceryLocation || ''} onChange={e => setGroceryLocation(Number(e.target.value))}>
                    {Object.keys(Location).filter(l => !isNaN(Number(l))).map((key) => (
                        <option key={key} value={Number(key)}>
                            {LocationNames[key]}
                        </option>
                    ))}
                </select>

            </div>
            <div className="form-group tags">
                {groceryTags.map((tag, index) => {
                    return (
                        <Tag key={index} name={tag} onSelect={addTag} selected={props.grocery?.tags.includes(tag)} />
                    )
                }
                )}
            </div>

            <div className="buttons">
                {!!props.grocery && <button disabled={isProcessing} className="delete-button" onClick={deleteThis}>Delete</button>}
                <button disabled={isProcessing} type="submit">Save</button>
            </div>
        </form>
    </Modal >);
}

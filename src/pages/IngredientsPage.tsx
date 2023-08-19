import { ChangeEvent, useEffect, useState } from 'react';
import { getAllIngredients } from '../api';
import { Ingredient } from '../Ingredient';
import { IngredientForm } from './IngredientForm';
import "./IngredientsPage.scss";
import { IngredientListItem } from './IngredientListItem';
import { IngredientFilters } from './IngredientFilters';
import Loading from '../Loading';


export default function IngredientsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
    const [displayIngredients, setDisplayIngredients] = useState<Ingredient[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<number>(-1);
    const [typeFilter, setTypeFilter] = useState<number>(-1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getAllIngredients()
            .then(data => {
                setIngredientsList(data);
                setDisplayIngredients(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => filterList(), [filters, statusFilter, typeFilter, ingredientsList, searchTerm]);

    const handleNewIngredientSaved = (ingredient: Ingredient) => {
        const index = ingredientsList.findIndex((t) => t.ingredientId === ingredient.ingredientId);
        const newList = [...ingredientsList];
        if (index === -1) {
            newList.push(ingredient);
        } else {
            newList[index] = ingredient;
        }
        setIngredientsList([...newList]);
        setIsEditing(false);
    };

    const handleIngredientDeleted = (ingredient: Ingredient) => {
        const newList = [...ingredientsList.filter((t) => t.ingredientId !== ingredient.ingredientId)];
        setIngredientsList(newList);
        setIsEditing(false);
    };

    const selectIngredientToEdit = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
        setIsEditing(true);
    };

    const toggleFilter = (name: string, checked: boolean) => {
        if (checked) {
            setFilters([...filters, name]);
        } else {
            setFilters(filters.filter((t) => t !== name));
        }
    };

    
    const chooseType = (e: ChangeEvent<HTMLSelectElement>) => {
        const type = parseInt(e.target.value);
        if (type === -1) {
            setTypeFilter(-1);
        } else {
            setTypeFilter(type);
        }
    };

    const chooseStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = parseInt(e.target.value);
        if (status === -1) {
            setStatusFilter(-1);
        } else {
            setStatusFilter(status);
        }
    };

    const onSearchTermChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    };


    let header = null;
    let body = null;
    if (isLoading) {
        body = <div className="loading-state"><Loading /><span>Loading Groceries...</span></div>;
    } else {
        header = (
            <div className="page-header">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." onChange={onSearchTermChanged} />
                    <button onClick={() => setIsEditing(true)}>+</button>
                </div>
                <IngredientFilters
                    toggleFilter={toggleFilter}
                    chooseType={chooseType}
                    chooseStatus={chooseStatus} />
            </div>);
        body = (
            <div className="ingredients-list">
                {displayIngredients.map((ingredient, index) => (
                    <IngredientListItem key={index} ingredient={ingredient} onClick={selectIngredientToEdit} />
                ))}
            </div>
        );
    }

    return (
        <div id="Ingredients">
            {header}
            <IngredientForm
                isOpen={isEditing}
                handleCancel={() => { setIsEditing(false); setSelectedIngredient(null); }}
                onSaveComplete={handleNewIngredientSaved}
                onDelete={handleIngredientDeleted}
                ingredient={selectedIngredient}
            />

            {body}
        </div>
    );

    function filterList() {
        let newDisplay = [...ingredientsList];
        if (filters.length > 0) {
            newDisplay = newDisplay.filter(ingredient =>
                filters.every(filter => ingredient.tags.includes(filter)));
        }
        if (statusFilter !== -1) {
            newDisplay = newDisplay.filter(ingredient => ingredient.status === statusFilter);
        }
        if (typeFilter !== -1) {
            newDisplay = newDisplay.filter(ingredient => ingredient.type === typeFilter);
        }
        if (searchTerm !== '') {
            newDisplay = newDisplay.filter(ingredient =>
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setDisplayIngredients(newDisplay);
    }
}

import { ChangeEvent, useEffect, useState } from 'react';
import { getAllIngredients } from '../api';
import { Ingredient, IngredientStatus, IngredientType } from '../Ingredient';
import { IngredientForm } from './IngredientForm';
import "./IngredientsPage.scss";
import { IngredientListItem } from './IngredientListItem';
import { IngredientFilters } from './IngredientFilters';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IngredientSearch } from './IngredientSearch';


export default function IngredientsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
    const [displayIngredients, setDisplayIngredients] = useState<Ingredient[]>([]);
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<number>(1); // make this 1 or -1 instead of a string
    const [filters, setFilters] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<number[]>([]);
    const [typeFilters, setTypeFilters] = useState<number[]>([]);
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

    useEffect(() => filterList(),
        [filters, statusFilter, typeFilters, ingredientsList, searchTerm, sortBy, sortDirection]);

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

    const chooseType = (values: Array<IngredientType>) => {
        setTypeFilters([...values]);
    }

    const chooseStatus = (values: Array<IngredientStatus>) => {
        setStatusFilter([...values]);
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
                    <IngredientSearch searchTerm={searchTerm} onSearchTermChanged={onSearchTermChanged} setSearchTerm={setSearchTerm} />
                    <button className="icon-button add-button" onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <IngredientFilters
                    toggleFilter={toggleFilter}
                    chooseType={chooseType}
                    chooseStatus={chooseStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                />


            </div>);
        body = displayIngredients.length > 0 ? (
            <div className="ingredients-list">
                {displayIngredients.map((ingredient, index) => (
                    <IngredientListItem key={index} ingredient={ingredient} onClick={selectIngredientToEdit} />
                ))}
            </div>
        ) : (
            <div className="empty-state">
                <span>No grocery items found!</span>
            </div>
        )
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
        if (statusFilter.length > 0) {
            newDisplay = newDisplay.filter(ingredient => statusFilter.includes(ingredient.status));
        }
        if (typeFilters.length > 0) {
            newDisplay = newDisplay.filter(ingredient => typeFilters.includes(ingredient.type));
        }
        if (searchTerm !== '') {
            newDisplay = newDisplay.filter(ingredient =>
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        sortItems(newDisplay);

        setDisplayIngredients(newDisplay);
    }

    function sortItems(newDisplay: Ingredient[]) {
        switch (sortBy) {
            case 'name':
                newDisplay.sort((a, b) => sortDirection * a.name.localeCompare(b.name));
                break;
            case 'status-date':
                newDisplay.sort((a, b) => {
                    if (a.statusDate === null) return sortDirection;
                    if (b.statusDate === null) return -sortDirection;
                    return sortDirection * (new Date(a.statusDate).getTime() - new Date(b.statusDate).getTime());
                });
                break;
            case 'type':
                newDisplay.sort((a, b) => a.type - b.type);
                break;
            default:
                break;
        }
    }
}

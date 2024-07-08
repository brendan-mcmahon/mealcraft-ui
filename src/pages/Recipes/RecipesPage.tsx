import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../api';
import { Recipe } from '../../Models';
import { NavLink } from 'react-router-dom';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllRecipes()
            .then(data => {
                setRecipes(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="page-title">Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <NavLink key={recipe.recipeId} to={`/recipe?id=${recipe.recipeId}`}>View Recipe</NavLink>
                ))}
            </ul>
            {/* <Link to="/recipe-builder">New Recipe</Link> */}
        </div>
    );
}


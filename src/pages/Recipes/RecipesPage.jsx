import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../api';
import { NavLink } from 'react-router-dom';
import './RecipesPage.scss';

export default function RecipesPage() {
	const [recipes, setRecipes] = useState([]);
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
			<ul className="recipes-list">
				{recipes.map((recipe) => (
					<NavLink key={recipe.id} to={`/recipe?id=${recipe.id}`}>{recipe.name}</NavLink>
				))}
			</ul>
			{/* <Link to="/recipe-builder">New Recipe</Link> */}
		</div>
	);
}


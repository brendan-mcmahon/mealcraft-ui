import { useEffect, useState } from 'react';
import { getAllRecipes, createRecipeFromUrl } from '../../api';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './RecipesPage.scss';
import Loading from '../../Loading';
import Modal from '../../Modal';

export default function RecipesPage() {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
	const [inputUrl, setInputUrl] = useState('');

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

	const submitUrl = async (e) => {
		e.preventDefault();
		console.log('URL:', inputUrl);
		try {
			await createRecipeFromUrl(inputUrl);
		} catch (error) {
			console.error('Error creating recipe from URL:', error);
		} finally {
			setShowAddRecipeModal(false);
			setInputUrl(''); // Clear the input
		}
	};

	const pasteFromClipboard = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setInputUrl(text); // Set the pasted text into the input field
		} catch (error) {
			console.error('Failed to read clipboard:', error);
		}
	};

	if (isLoading) {
		return <Loading message="Loading Recipes..." />;
	}

	return (
		<>
			<div className="recipes-page">
				<h1 className="page-title">Recipes</h1>
				<ul className="recipes-list">
					{recipes.map((recipe) => (
						<NavLink key={recipe.id} to={`/recipe?id=${recipe.id}`}>{recipe.name}</NavLink>
					))}
				</ul>
				<Link className="add-button" to="/recipe"><FontAwesomeIcon icon={faPlusCircle} /></Link>
				<button className="url-button" onClick={() => setShowAddRecipeModal(true)}>URL</button>
			</div>
			<Modal title="Add Recipe from URL" isOpen={showAddRecipeModal} onClose={() => setShowAddRecipeModal(false)}>
				<form className="add-recipe-form" onSubmit={submitUrl}>
					<div className="form-input">
						<input
							type="text"
							value={inputUrl}
							onChange={(e) => setInputUrl(e.target.value)}
						/>

					</div>
					<div className="buttons">
						<button type="button" onClick={pasteFromClipboard}>Paste</button>
						<button type="submit">Add</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

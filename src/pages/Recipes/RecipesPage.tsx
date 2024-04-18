import { Link } from 'react-router-dom';

export default function RecipesPage() {
    return (
        <div>
            <h1 className="page-title">Recipes</h1>
            <Link to="/recipe-builder">New Recipe</Link>
        </div>
    );
}


import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from 'react-router-dom'
import GroceriesPage from './pages/Groceries/GroceriesPage.jsx'
import RecipesPage from './pages/Recipes/RecipesPage.jsx'
import RecipePage from './pages/Recipes/RecipePage.jsx'
// import WeekPage from './pages/WeekPage'
import StockPage from './pages/StockPage.jsx'
import DataPage from './pages/DataPage.jsx'
import './App.scss'
import WeekPage from './pages/WeekPage.jsx'
import { useState, useEffect } from 'react'
import groceriesIcon from './assets/apple.svg';
import stockIcon from './assets/clipboard.svg';
import recipesIcon from './assets/hat.svg';
import weekIcon from './assets/calendar.svg';

const buildTime = import.meta.env.VITE_BUILD_TIME

const navLinks = [
	{ to: '/groceries', label: 'Groceries', icon: groceriesIcon },
	{ to: '/stock', label: 'Take Stock', icon: stockIcon },
	{ to: '/recipes', label: 'Recipes', icon: recipesIcon },
	{ to: '/week', label: 'This Week', icon: weekIcon },

]

const App = () => {
	const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 600px)').matches);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.matchMedia('(max-width: 600px)').matches);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);


	return (
		<Router basename={import.meta.env.VITE_BUILD_TIME}>
			<nav>
				{navLinks.map(({ to, label, icon }) => (
					<NavLink key={to} to={to}>
						{isMobile
							? <img src={icon} />
							: label}
					</NavLink>
				))}

			</nav>
			{buildTime && <div className="build-time">v{buildTime}</div>}
			<Routes>
				<Route path="/" element={<StockPage />}></Route>
				<Route path="/groceries" element={<GroceriesPage />}></Route>
				<Route path="/recipes" element={<RecipesPage />}></Route>
				<Route path="/stock" element={<StockPage />}></Route>
				<Route path="/data" element={<DataPage />}></Route>
				<Route path="/week" element={<WeekPage />}></Route>
				<Route path="/recipe" element={<RecipePage />} />
			</Routes>
		</Router>
	)
}

export default App

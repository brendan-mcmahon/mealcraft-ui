import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom'
import GroceriesPage from './pages/Groceries/GroceriesPage'
import RecipesPage from './pages/Recipes/RecipesPage'
import RecipeBuilderPage from './pages/Recipes/RecipeBuilderPage'
// import WeekPage from './pages/WeekPage'
import StockPage from './pages/StockPage'
// import DataPage from './pages/DataPage'
import './App.scss'
import WeekPage from './pages/WeekPage'
import { useState, useEffect } from 'react'
import groceriesIcon from './assets/groceries.svg';
import stockIcon from './assets/stock.svg';
import recipesIcon from './assets/recipe.svg';
import weekIcon from './assets/week.svg';

const buildTime = import.meta.env.VITE_BUILD_TIME

const navLinks = [
  { to: '/groceries', label: 'Groceries', icon: groceriesIcon },
  { to: '/stock', label: 'Take Stock', icon: stockIcon },
  { to: '/recipes', label: 'Recipes', icon: recipesIcon },
  { to: '/week', label: 'This Week', icon: weekIcon },

]

const App: React.FC = () => {
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
        {/* <NavLink to="/">This Week</NavLink> */}
        {navLinks.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}>
            {isMobile
              // ? <span role="img" aria-label={label}>{icon}</span>
              ? <img src={icon} />
              : label}
          </NavLink>
        ))}
        {/* <NavLink to="/groceries">Groceries</NavLink>
        <NavLink to="/stock">Take Stock</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/week">This Week</NavLink> */}
      </nav>
      {buildTime && <div className="build-time">v{buildTime}</div>}
      <Routes>
        <Route path="/" element={<StockPage />}></Route>
        <Route path="/groceries" element={<GroceriesPage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/stock" element={<StockPage />}></Route>
        <Route path="/recipe-builder" element={<RecipeBuilderPage />}></Route>
        {/* <Route path="/data" element={<DataPage />}></Route> */}
        <Route path="/week" element={<WeekPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App

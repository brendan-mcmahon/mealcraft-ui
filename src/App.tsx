import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import GroceriesPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import WeekPage from './pages/WeekPage';
import "./App.scss";

const baseUrl: string = (process.env.NODE_ENV as string) === "production" ? "/mealcraft-ui" : "";
const buildTime = import.meta.env.VITE_BUILD_TIME;

const App: React.FC = () => {

  const currentPath = window.location.pathname;
  console.log('currentPath', currentPath);

  return (
    <Router basename={baseUrl}>
      <nav>
        <NavLink to="/" >This Week</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/groceries">Groceries</NavLink>
      </nav>
        {buildTime && <div className="build-time">v{buildTime}</div> }
      <Routes>
        <Route path="/" element={<WeekPage />}>
        </Route>
        <Route path="/groceries" element={<GroceriesPage />}>
        </Route>
        <Route path="/recipes" element={<RecipesPage />}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

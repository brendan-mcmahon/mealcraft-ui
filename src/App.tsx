import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import WeekPage from './pages/WeekPage';
import "./App.scss";

const baseUrl: string = (process.env.NODE_ENV as string) === "production" ? "/mealcraft-ui" : "";
const buildTime = import.meta.env.VITE_BUILD_TIME;

const App: React.FC = () => {
  console.log('build time', buildTime);
  console.log(baseUrl)
  return (
    <Router basename={baseUrl}>
      <nav>
        <a href="/" >This Week</a>
        <a href="/recipes">Recipes</a>
        <a href="/ingredients">Ingredients</a>
      </nav>
        <div className="build-time">v{buildTime}</div>
      <Routes>
        <Route path="/" element={<WeekPage />}>
        </Route>
        <Route path="/ingredients" element={<IngredientsPage />}>
        </Route>
        <Route path="/recipes" element={<RecipesPage />}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

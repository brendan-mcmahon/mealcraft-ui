import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import WeekPage from './pages/WeekPage';
import "./App.scss";

const baseUrl: string = (process.env.NODE_ENV as string) === "production" ? "/meal-ui" : "";
const buildTime = import.meta.env.VITE_BUILD_TIME;

const App: React.FC = () => {
  return (
    <Router basename={baseUrl}>
      <nav>
        <a href="/" >This Week</a>
        <a href="/recipes">Recipes</a>
        <a href="/ingredients">Ingredients</a>
        <div className="build-time">Build time: {buildTime}</div>
      </nav>
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

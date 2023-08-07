import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import WeekPage from './pages/WeekPage';
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <a href="/" >This Week</a>
        <a href="/recipes">Recipes</a>
        <a href="/ingredients">Ingredients</a>
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
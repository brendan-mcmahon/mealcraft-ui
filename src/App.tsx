import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom'
import GroceriesPage from './pages/IngredientsPage'
import RecipesPage from './pages/RecipesPage'
import WeekPage from './pages/WeekPage'
import StockPage from './pages/StockPage'
import './App.scss'
// import RecipeBuilderPage from './pages/RecipeBuilderPage'

// const baseUrl: string =
//   (process.env.NODE_ENV as string) === 'production' ? '/mealcraft-ui' : ''
const buildTime = import.meta.env.VITE_BUILD_TIME

const App: React.FC = () => {
  // const currentPath = window.location.pathname

  return (
    <Router basename={import.meta.env.VITE_BUILD_TIME}>
      <nav>
        {/* <NavLink to="/">This Week</NavLink> */}
        {/* <NavLink to="/recipes">Recipes</NavLink> */}
        <NavLink to="/groceries">Groceries</NavLink>
        <NavLink to="/stock">Take Stock</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
      </nav>
      {buildTime && <div className="build-time">v{buildTime}</div>}
      <Routes>
        <Route path="/" element={<StockPage />}></Route>
        <Route path="/groceries" element={<GroceriesPage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/stock" element={<StockPage />}></Route>
        {/* <Route path="/recipe-builder" element={<RecipeBuilderPage />}></Route> */}
      </Routes>
    </Router>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'

function App() {
  

  return (
    <>
      <AddRecipeForm />
      <RecipeList />
    </>
  )
}

export default App

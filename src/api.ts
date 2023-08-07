import axios, { AxiosResponse } from 'axios';

const API_URL = "https://ytkjy0j5al.execute-api.us-east-2.amazonaws.com/prod";

// Define interfaces for your ingredients
export enum IngredientStatus {
  Plenty,
  Low,
  Out,
  Ordered
}

export interface Ingredient {
  ingredientId: string;
  name: string;
  tags: string[];
  status: IngredientStatus;
}

// Function to get an ingredient by ID
export function getIngredient(ingredientId: string): Promise<Ingredient> {
  return axios.get<Ingredient>(`${API_URL}/ingredients?ingredientId=${ingredientId}`)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch(error => {
      throw error;
    });
}

export function getAllIngredients(): Promise<Ingredient[]> {
  return axios.get<Ingredient[]>(`${API_URL}/ingredients/`)
    .then((response: AxiosResponse<Ingredient[]>) => response.data)
    .catch(error => {
      throw error;
    });
}

export function updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
  console.log('updateIngredient', ingredient);
  return axios.put<Ingredient>(`${API_URL}/ingredients`, ingredient)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch(error => {
      throw error;
    });
}

// Function to save an ingredient
export function saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
  return axios.post<Ingredient>(`${API_URL}/ingredients`, ingredient)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch(error => {
      throw error;
    });
}

// Add more API calls as needed

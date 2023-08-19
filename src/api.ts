import axios, { AxiosResponse } from "axios";
import { Ingredient } from "./Ingredient";

const API_URL = "https://ytkjy0j5al.execute-api.us-east-2.amazonaws.com/prod";

export function getIngredient(ingredientId: string): Promise<Ingredient> {
  return axios
    .get<Ingredient>(`${API_URL}/ingredients?ingredientId=${ingredientId}`)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function getAllIngredients(): Promise<Ingredient[]> {
  return axios
    .get<Ingredient[]>(`${API_URL}/ingredients/`)
    .then((response: AxiosResponse<Ingredient[]>) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
  ingredient.tags = [...new Set(ingredient.tags)];

  return axios
    .put<Ingredient>(`${API_URL}/ingredients`, ingredient)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
  ingredient.tags = [...new Set(ingredient.tags)];

  return axios
    .post<Ingredient>(`${API_URL}/ingredients`, ingredient)
    .then((response: AxiosResponse<Ingredient>) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function deleteIngredient(ingredientId: string): Promise<void> {
  console.log("deleting");
  return axios
    .delete<void>(`${API_URL}/ingredients?ingredientId=${ingredientId}`)
    .then((response: AxiosResponse<void>) => response.data)
    .catch((error) => {
      throw error;
    });
}

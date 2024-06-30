import axios, { AxiosResponse } from "axios";
import { Grocery } from "./Grocery";

const API_URL = "https://ytkjy0j5al.execute-api.us-east-2.amazonaws.com/prod";

export function getGrocery(groceryId: string): Promise<Grocery> {
  return axios
    .get<Grocery>(`${API_URL}/ingredients?ingredientId=${groceryId}`)
    .then((response: AxiosResponse<Grocery>) => mapGrocery(response.data))
    .catch((error) => {
      throw error;
    });
}

export function getAllGroceries(): Promise<Grocery[]> {
  return axios
    .get<Grocery[]>(`${API_URL}/ingredients/`)
    .then((response: AxiosResponse<Grocery[]>) => response.data.map(mapGrocery))
    .catch((error) => {
      throw error;
    });
}

export function updateGrocery(grocery: Grocery): Promise<Grocery> {
  grocery.tags = [...new Set(grocery.tags)];

  return axios
    .put<Grocery>(`${API_URL}/ingredients`, grocery)
    .then((response: AxiosResponse<Grocery>) => mapGrocery(response.data))
    .catch((error) => {
      throw error;
    });
}

export function saveGrocery(grocery: Grocery): Promise<Grocery> {
  grocery.tags = [...new Set(grocery.tags)];

  return axios
    .post<Grocery>(`${API_URL}/ingredients`, grocery)
    .then((response: AxiosResponse<Grocery>) => mapGrocery(response.data))
    .catch((error) => {
      throw error;
    });
}

export function deleteGrocery(groceryId: string): Promise<void> {
  return axios
    .delete<void>(`${API_URL}/ingredients?ingredientId=${groceryId}`)
    .then((response: AxiosResponse<void>) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function updateGroceries(groceries: Grocery[]): Promise<Grocery[]> {
  return axios
    .put<Grocery[]>(`${API_URL}/ingredients/batch`, groceries)
    .then((response: AxiosResponse<Grocery[]>) => response.data.map(mapGrocery))
    .catch((error) => {
      throw error;
    });
}

const mapGrocery = (grocery: Grocery) => {
  return {
    ...grocery,
    statusDate: grocery.statusDate ? new Date(grocery.statusDate) : null,
    expirationDate: grocery.expirationDate ? new Date(grocery.expirationDate) : null,
  };
}

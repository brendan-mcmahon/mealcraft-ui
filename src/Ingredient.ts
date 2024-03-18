export enum IngredientStatus {
  Plenty,
  Low,
  Out,
  Ordered
}

export enum IngredientType {
  Food,
  Hygiene,
  Cleaning,
  Other
}

export interface Ingredient {
  ingredientId: string;
  name: string;
  tags: string[];
  status: IngredientStatus;
  type: IngredientType;
  statusDate: Date | null;
  expirationDate: Date | null;
}

export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
}

export interface RecipeIngredient {
  ingredientId: string;
  amount: number;
  unit: string;
}
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

export enum Location {
  Pantry,
  Refrigerator,
  LaundryRoom,
  KidsBathroom,
  MasterBathroom,
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
  location: Location | null;
}

export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
}

// JOIN
export interface RecipeIngredient {
  ingredientId: string;
  amount: number;
  unit: string;
}
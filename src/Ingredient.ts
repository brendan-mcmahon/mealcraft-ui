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
}

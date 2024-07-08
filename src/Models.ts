export enum GroceryStatus {
  Plenty,
  Low,
  Out,
  Ordered
}

export enum GroceryType {
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
  Other,
  Freezer,
  Kitchen,
  AboveMicrowave
}

export const LocationNames = {
  [Location.Pantry]: 'Pantry',
  [Location.Refrigerator]: 'Fridge',
  [Location.Freezer]: 'Freezer',
  [Location.Other]: 'Other',
  [Location.KidsBathroom]: 'Kids Bathroom',
  [Location.MasterBathroom]: 'Master Bathroom',
  [Location.LaundryRoom]: 'Laundry Room',
  [Location.AboveMicrowave]: 'Above Microwave',
  [Location.Kitchen]: 'Kitchen',
};

export const LocationSortOrder = [
  Location.Pantry,
  Location.Refrigerator,
  Location.Freezer,
  Location.Kitchen,
  Location.AboveMicrowave,
  Location.KidsBathroom,
  Location.LaundryRoom,
  Location.MasterBathroom,
  Location.Other,
];

export interface Grocery {
  ingredientId: string;
  name: string;
  tags: string[];
  status: GroceryStatus;
  type: GroceryType;
  statusDate: Date | null;
  expirationDate: Date | null;
  location: Location;
}

export interface Recipe {
  recipeId: string;
  subRecipes: Recipe[];
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
}

export interface RecipeIngredient {
  ingredient: Grocery;
  amount: number;
  unit: string;
}

export interface RecipeIngredientDto {
  ingredientId: string;
  amount: number;
  unit: string;
}
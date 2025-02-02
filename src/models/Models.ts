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
	Pantry, // 0
	Refrigerator, // 1
	LaundryRoom, // 2
	KidsBathroom, // 3
	MasterBathroom, // 4
	Other, // 5
	Freezer, // 6
	Kitchen, // 7
	AboveMicrowave, // 8
	CheeseDrawer, // 9
	Crisper, // 10
	SpiceDrawer, // 11
	CanBasket, // 12
	SauceBasket, // 13
	SnackDrawers, // 14
	UnderSink, // 15
}

export const LocationNames = {
	[Location.Pantry]: 'Pantry',
	[Location.Refrigerator]: 'Fridge',
	[Location.CheeseDrawer]: 'Cheese Drawer',
	[Location.Crisper]: 'Crisper',
	[Location.Freezer]: 'Freezer',
	[Location.Other]: 'Other',
	[Location.KidsBathroom]: 'Kids Bathroom',
	[Location.MasterBathroom]: 'Master Bathroom',
	[Location.LaundryRoom]: 'Laundry Room',
	[Location.AboveMicrowave]: 'Above Microwave',
	[Location.Kitchen]: 'Kitchen',
	[Location.SpiceDrawer]: 'Spice Drawer',
	[Location.CanBasket]: 'Can Basket',
	[Location.SauceBasket]: 'Sauce Basket',
	[Location.SnackDrawers]: 'Snack Drawers',
	[Location.UnderSink]: 'Under Sink',
};

export const LocationSortOrder = [
	Location.Pantry,
	Location.CanBasket,
	Location.SauceBasket,
	Location.SpiceDrawer,
	Location.SnackDrawers,
	Location.Refrigerator,
	Location.CheeseDrawer,
	Location.Crisper,
	Location.Freezer,
	Location.Kitchen,
	Location.UnderSink,
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
	// subRecipes: Recipe[]; // This doesn't need to happen yet, but would be for things like seasonings or sauces
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
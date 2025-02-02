# Mealcraft
A web app for my family. The goal is to streamline and simplify the meal planning and grocery shopping process.

## Functionality:
There are a few main components of the app:
### Groceries
The app keeps a database of items including their names, where we keep them in the house, tags to help categorize them, and how approximately how much we have remaining (Plenty, Low, Out). For parishable items, it can also track expiration dates.

### Recipes
Simple recipe functionality. Stores all of the relevant info with the added feature that a recipe's ingredients are linked to the groceries we have. This allows us to have real-time info about whether or not we have what is needed for a meal!

### Meal Plan
A calendar view allows us to set recipes for each day. So on Sundays, we can decide what we're eating from a pre-set list of food we know we like, and then easily see what ingredients we need to purchase.

### Shopping
A shopping list that can be used either in ordering online or while in the store. A simple checklist that marks the status of the items as "Ordered" when checking them off. This list would be built from this week's meal plan plus any other items that are tagged as "staples" that are in a "Low" or "Out" status. This list can still be manually manipulated to add or remove things as we see fit.

## Tech:

### Front End
The front end is written in react and hosted on vercel.

### Back End
The back end is mainly two things:
* AWS Lambda with a function URL that acts as the API
* CockroachDB relational database


## Future plans:
To make this app really successful, there are a few features I really want to implement
* Recipe creation from a link
  * I really want to have a place where we can drop a link to a recipe from any given website and have it build the recipe in our system. This would be pretty easy (I think) except that we need to be able to link the ingredients to ones we have and/or create new ingredients we're not currently tracking.
  * My current idea is to use an LLM like OpenAI's API to parse the recipe into a digestable format, and then give it access to the database somehow to search for the ingredients so it can gather the ids needed for the ingredients. It could, in theory, also generate new ingredients that aren't being tracked. For this, I would like to be able to approve the recipe or something before it saved? Or maybe I'm being weird about it, it's not like you can't edit a recipe after it's created.
* Utilize Kroger's API to automatically build an online shopping cart or list with the ingredients we have. I think this is doable, but I haven't come close enough to finishing the other features to know for sure.
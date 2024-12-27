# General
  - [x] Favicon for PWA

# Groceries
- [ ] Desktop-friendly version
- [ ] Go button for search to collapse the keyboard
- [ ] Add ability to create new tags
- [ ] Should the expiration date clear when the status goes to "out"? Yeah, I think so.
- [x] When you click the plus button to add a new ingredient, copy the text from the current search if there is one
- [ ] Add a filter for "last updated"
- [ ] Add filter for "expired"

# Shop
- [ ] Show shopping list for the week
- [ ] Each item should have a checkmark next to it to mark as "in cart" or whatever
- [ ] At the bottom, a button to set the status of all checked items to "plenty"

# Stock
- [x] Group by location (pantry, fridge, laundry room, etc)
  
# Recipes
- [ ] Loading state
- [ ] Styling
- [ ] Add Ingredient modal??? Should this be a modal or just on the page?
- [ ] Need a quick way to add new ingredients that don't exist
- [ ] Collapsible ingredient and instruction sections

* Structure of a recipe:
  * Id
  * Name
  * Description
  * Ingredients
    * Id
    * Name
    * Quantity
    * Unit
  * Steps
    * Id
    * Description
    * Time
  * Tags
    * Id
    * Name
  * External Link
  * Weight Watchers Points
  * List of dates this was scheduled for
  * Star rating
* Views:
  * List
  * Create
  * Edit
  
# Meal Planning
- [ ] Would be cool to have a weather API to quickly see if we can cook out or if we should be eating chili or something like that. Extremely minor, but would be cool.
- [ ] Would also be cool to see what's on the calendar in the evening to know if we'll be at home for dinner or not. Extremely minor, but would be cool.
- [ ] Be able to build a "temporary meal" that just is just a group of items. Would be useful for Addie and Walt's lunches, for example so you can add things to the lunchbox without having to create a permanent meal. Actually, "Lunchbox" would be a cool name for that feature.
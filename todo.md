# Ingredients
- [x] Loading state
- [ ] Styling
  - [ ] Desktop-friendly version
  - [x] Logo
- [x] Add timestamp and friendly UI for when the last time a status was updated
- [x] Editing an ingredient is rough
  - [x] Fix the title
  - [x] Fix the tags not highlighting (issue with using controlled vs managed components)
  - [x] Saving state
- [x] Clear button for search bar
- [x] Collapse Filters
- [x] Swiping is too buggy, think of another way
- [ ] Go button for search to collapse the keyboard
- [x] Sort by last updated status
- [x] Expiration dates
- [x] Status dates are not working. check in aws to see if they're being saved 
- [ ] Add ability to create new tags
- [ ] Should the expiration date clear when the stats goes to "out"?
  
# Recipes
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
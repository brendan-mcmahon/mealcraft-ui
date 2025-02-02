CREATE TABLE public.grocery (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  name VARCHAR(255) NOT NULL,
  statusdate TIMESTAMP NULL,
  expirationdate TIMESTAMP NULL,
  type INT8 NULL,
  location INT8 NULL,
  status INT8 NULL,
  CONSTRAINT grocery_pkey PRIMARY KEY (id ASC)
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION

CREATE TABLE public.tag (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  label VARCHAR(100) NOT NULL,
  CONSTRAINT tags_pkey PRIMARY KEY (id ASC)
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION

CREATE TABLE public.grocerytag (
  groceryid INT8 NOT NULL,
  tagid INT8 NOT NULL,
  CONSTRAINT grocerytags_pkey PRIMARY KEY (groceryid ASC, tagid ASC),
  CONSTRAINT fk_grocerytags_grocery FOREIGN KEY (groceryid) REFERENCES public.grocery(id) ON DELETE CASCADE,
  CONSTRAINT fk_grocerytags_tags FOREIGN KEY (tagid) REFERENCES public.tag(id) ON DELETE CASCADE
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION

CREATE TABLE public.recipe (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  name VARCHAR(255) NOT NULL,
  description STRING NULL,
  CONSTRAINT recipe_pkey PRIMARY KEY (id ASC)
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION

CREATE TABLE public.recipeingredient (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  recipeid INT8 NOT NULL,
  groceryid INT8 NOT NULL,
  unit VARCHAR(50) NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0.00:::DECIMAL,
  CONSTRAINT recipeingredient_pkey PRIMARY KEY (id ASC),
  CONSTRAINT fk_recipeingredient_recipe FOREIGN KEY (recipeid) REFERENCES public.recipe(id) ON DELETE CASCADE,
  CONSTRAINT fk_recipeingredient_grocery FOREIGN KEY (groceryid) REFERENCES public.grocery(id) ON DELETE CASCADE
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION

CREATE TABLE public.recipeinstruction (
  id INT8 NOT NULL DEFAULT unique_rowid(),
  recipeid INT8 NOT NULL,
  text STRING NOT NULL,
  stepnumber INT8 NOT NULL,
  CONSTRAINT recipeinstruction_pkey PRIMARY KEY (id ASC),
  CONSTRAINT fk_recipeinstruction_recipe FOREIGN KEY (recipeid) REFERENCES public.recipe(id) ON DELETE CASCADE
) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION
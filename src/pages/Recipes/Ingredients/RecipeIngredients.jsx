import { PointerSensor, useSensor, useSensors, DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RecipeIngredientListItem from './RecipeIngredientListItem';

const RecipeIngredients = ({ ingredients, setIngredients, editMode, removeIngredient }) => {
	console.log('RecipeIngredients:', ingredients);

	const isMobile = window.innerWidth <= 768;
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: isMobile ? 250 : 0, // this is a long press delay
				tolerance: 5,
			},
		})
	);

	const handleDragEnd = (event) => {
		console.log("handling drag end");
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = ingredients.findIndex(item => item.id === active.id);
			const newIndex = ingredients.findIndex(item => item.id === over.id);
			const newOrder = arrayMove(ingredients, oldIndex, newIndex).map(i => i.id);
			setIngredients(newOrder);
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={ingredients.map(i => i.id)} strategy={verticalListSortingStrategy}>
				<ol style={{ padding: 0 }}>
					{ingredients.map((ingredient) => (
						<RecipeIngredientListItem
							key={ingredient.id}
							id={ingredient.id}
							ingredient={ingredient}
							editMode={editMode}
							removeIngredient={() => removeIngredient(ingredient.id)}
						/>
					))}
				</ol>
			</SortableContext>
		</DndContext>
	);
};


export default RecipeIngredients;
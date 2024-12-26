import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RecipeInstructionListItem from './RecipeInstructionListItem';

const RecipeInstructions = ({ instructions, setInstructions, editMode, removeInstruction }) => {
	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setInstructions((items) => {
				const oldIndex = items.findIndex(item => item.text === active.id);
				const newIndex = items.findIndex(item => item.text === over.id);
				const newOrder = arrayMove(items, oldIndex, newIndex).map(i => i.text);
				return newOrder; // Only return IDs in order
			});
		}
	};

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={instructions.map(i => i.text)} strategy={verticalListSortingStrategy}>
				<ol style={{ padding: 0 }}>
					{instructions.map((instruction) => (
						<RecipeInstructionListItem
							key={instruction.text}
							id={instruction.text}
							instruction={instruction}
							editMode={editMode}
							removeInstruction={() => removeInstruction(instruction.text)}
						/>
					))}
				</ol>
			</SortableContext>
		</DndContext>
	);
};

export default RecipeInstructions;
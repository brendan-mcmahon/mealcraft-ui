import { PointerSensor, useSensor, useSensors, DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RecipeInstructionListItem from './RecipeInstructionListItem';

const RecipeInstructions = ({ instructions, setInstructions, editMode, removeInstruction }) => {
	// how can I tell if I'm on mobile?
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
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = instructions.findIndex(item => item.text === active.id);
			const newIndex = instructions.findIndex(item => item.text === over.id);
			const newOrder = arrayMove(instructions, oldIndex, newIndex).map(i => i.text);
			setInstructions(newOrder);
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
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
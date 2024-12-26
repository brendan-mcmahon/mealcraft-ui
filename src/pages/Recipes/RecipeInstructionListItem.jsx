import { useState } from 'react';
import Checkbox from '../../Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const RecipeInstructionListItem = ({ instruction, editMode, removeInstruction, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const [isChecked, setIsChecked] = useState(false);

	const style = {
		transform: CSS.Transform.toString(transform) || 'none',
		transition: transition || 'none',
		textDecoration: isChecked ? 'line-through' : 'none',
		padding: '8px',
		boxSizing: 'border-box',
		border: '1px dashed red', // Debug border
		backgroundColor: transform ? 'lightblue' : 'transparent', // Highlight dragging
	};

	return (
		<li ref={setNodeRef} style={style} {...attributes} {...listeners} className="list-item-container">
			<label className="list-item">
				{!editMode && <Checkbox onCheck={() => setIsChecked(!isChecked)} />}
				<span>{instruction.text}</span>
				{editMode && <FontAwesomeIcon onClick={removeInstruction} className="delete" icon={faXmark} />}
			</label>
		</li>
	);
};

export default RecipeInstructionListItem;

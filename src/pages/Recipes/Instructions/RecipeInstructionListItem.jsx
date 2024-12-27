import { useState } from 'react';
import Checkbox from '../../../Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const RecipeInstructionListItem = ({ instruction, editMode, removeInstruction, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !editMode });
	const [isChecked, setIsChecked] = useState(false);

	const style = {
		transform: CSS.Translate.toString(transform) || 'none',
		transition: transition || 'none',
		touchAction: 'none',
		textDecoration: isChecked ? 'line-through' : 'none',
		padding: '8px',
		boxSizing: 'border-box',
		outline: isDragging ? '2px dotted #007BFF' : 'none',
		opacity: isDragging ? 0.8 : 1,
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

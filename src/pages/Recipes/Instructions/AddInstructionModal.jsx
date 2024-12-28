import { useState } from 'react';
import Modal from '../../../Modal';

const AddInstructionModal = (props) => {
	const [instruction, setInstruction] = useState('');

	const handleSave = (e) => {
		e.preventDefault();
		if (!instruction) return;
		props.handleAddInstruction(instruction);

		setInstruction("");
		props.onClose();
	};

	const saveOnEnter = (e) => {
		if (e.key === 'Enter') {
			handleSave(e);
		}
	};

	return (
		<Modal title="Add Instruction" isOpen={props.isOpen} onClose={props.onClose}>
			<form className="add-instruction-form" onSubmit={handleSave}>
				<div className="form-input">
					<textarea
						type="number"
						value={instruction}
						onChange={(e) => setInstruction(e.target.value)}
						onKeyDown={saveOnEnter}
					/>
				</div>

				<button type="submit">Add</button>
			</form>
		</Modal>
	);
};

export default AddInstructionModal;

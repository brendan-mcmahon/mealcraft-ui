import { useState } from 'react';
import Modal from '../../Modal';

const AddInstructionModal = (props) => {
	const [instruction, setInstruction] = useState('');

	const handleSave = (e) => {
		e.preventDefault();
		if (!instruction) return;
		console.log("instruction", instruction.value);
		props.handleAddInstruction(instruction);

		setInstruction(null);
		props.onClose();
	};

	return (
		<Modal title="Add Instruction" isOpen={props.isOpen} onClose={props.onClose}>
			<form className="add-instruction-form" onSubmit={handleSave}>
				<div className="form-input">
					<textarea
						type="number"
						value={instruction}
						onChange={(e) => setInstruction(e.target.value)}
					/>
				</div>

				<button type="submit">Save</button>
			</form>
		</Modal>
	);
};

export default AddInstructionModal;

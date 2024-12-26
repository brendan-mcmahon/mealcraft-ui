import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ title, isOpen, onClose, children }) => {
	return (
		<div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="header">
					<h2>{title}</h2>
					<button className="close-button" onClick={onClose}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
};

export default Modal;

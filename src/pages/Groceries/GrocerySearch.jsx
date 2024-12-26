import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export function GrocerySearch(props) {
	return <div className="search-wrapper">
		<input type="text" placeholder="Search..." value={props.searchTerm} onChange={props.onSearchTermChanged} />
		{props.searchTerm && <button className="icon-button clear-button" onClick={() => props.setSearchTerm('')}><FontAwesomeIcon icon={faXmark} /></button>}
	</div>;
}

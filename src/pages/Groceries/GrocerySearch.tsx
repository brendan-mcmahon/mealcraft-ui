import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type GrocerySearchProps = {
    searchTerm: string;
    onSearchTermChanged: (e: ChangeEvent<HTMLInputElement>) => void;
    setSearchTerm: (searchTerm: string) => void;
};

export function GrocerySearch(props: GrocerySearchProps) {
    return <div className="search-wrapper">
        <input type="text" placeholder="Search..." value={props.searchTerm} onChange={props.onSearchTermChanged} />
        {props.searchTerm && <button className="icon-button clear-button" onClick={() => props.setSearchTerm('')}><FontAwesomeIcon icon={faXmark} /></button>}
    </div>;
}

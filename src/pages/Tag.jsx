import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import "./Tag.scss"

export function Tag(props) {
	const [selected, setSelected] = useState(props.selected || false);
	// const id = uuidv4();

	useEffect(() => {
		props.onSelect(props.tag, selected);
	}, [selected]);

	useEffect(() => {
		setSelected(props.selected || false);
	}, [props.selected]);

	const onClick = () => {
		setSelected(!selected);
	};

	return (
		<div className={`chip ${selected ? "checked" : ""}`}
			id={props.tag.id}
			onClick={onClick}>
			<span className="chip-text">{props.tag.label}</span>
		</div>
	);
}

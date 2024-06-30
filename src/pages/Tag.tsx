import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Tag.scss"

type TagProps = {
    onSelect: (name: string, checked: boolean) => void;
    name: string;
    selected?: boolean;
};
export function Tag(props: TagProps) {
    const [selected, setSelected] = useState(props.selected || false);
    const id = uuidv4();

    useEffect(() => {
        console.log(`Tag ${props.name} selected: ${selected}`)
        props.onSelect(props.name, selected);
    }, [selected]);

    useEffect(() => {
        setSelected(props.selected || false);
    }, [props.selected]);

    const onClick = () => {
        setSelected(!selected);
    };

    return (
        <div className={`chip ${selected ? "checked" : ""}`}
            id={id}
            onClick={onClick}>
            <span className="chip-text">{props.name}</span>
        </div>
    );
}

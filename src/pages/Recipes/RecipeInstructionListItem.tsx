import { useState } from 'react';
import Checkbox from '../../Checkbox';

interface RecipeInstructionListItemProps {
    instruction: string;
}

const RecipeInstructionListItem = ({ instruction }: RecipeInstructionListItemProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const style = { textDecoration: isChecked ? "line-through" : "none" };

    return (
        <li className="instruction-container">
            <label className="instruction">
                <Checkbox onCheck={() => setIsChecked(!isChecked)} />
                <span style={style} >{instruction}</span>
            </label>
        </li>
    );
};

export default RecipeInstructionListItem;
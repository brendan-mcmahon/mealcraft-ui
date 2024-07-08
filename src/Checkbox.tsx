import React, { useState } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
    onCheck: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onCheck }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onCheck(!isChecked);
    };

    return (
        <div className="checkbox-wrapper">
            
            <input checked={isChecked}
                onChange={handleCheckboxChange}
                type="checkbox"
            />
            
            <svg viewBox="0 0 35.6 35.6">
                <circle className="background" cx="17.8" cy="17.8" r="17.8" />
                <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87" />
            </svg>
        </div>
    );
};




export default Checkbox;
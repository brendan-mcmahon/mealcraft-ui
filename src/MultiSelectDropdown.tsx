import { useEffect, useRef, useState } from 'react';

interface MultiSelectDropdownProps<T> {
    onChange: (value: Array<T>) => void;
    options: Array<{
        label: string;
        value: T;
    }>;
}
const MultiSelectDropdown = <T extends object | unknown>({ onChange, options }: MultiSelectDropdownProps<T>) => {
    const [selectedValues, setSelectedValues] = useState<Array<T>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onChange(selectedValues);
    }, [selectedValues]);

    const toggleSelection = (value: T) => {
        setSelectedValues((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((prevValue) => prevValue !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const getLabel = () => {
        if (selectedValues.length === 0 || selectedValues.length === options.length) {
            return 'All';
        } else {
            return options.filter((option) => selectedValues.includes(option.value)).map((option) => option.label).join(", ");
        }
    }


    return (
        <div ref={dropdownRef} className="multiselect-container">
            <div className="multiselect-label" onClick={() => setIsOpen(!isOpen)}>
                {getLabel()}
            </div>
            {isOpen && (
                <div className="multiselect-options" >
                    {options.map((option, index) => (
                        <div key={index}
                            onClick={() => toggleSelection(option.value)}
                            className={`multiselect-option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;

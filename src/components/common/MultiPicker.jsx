const MultiPicker = ({
                         options,
                         selectedValues = [],
                         onChange,
                         placeholder = "-- Select one or more options --",
                     }) => {
    if (!Array.isArray(options)) {
        return <p>thing is not an array</p>;
    }

    const handleChange = (event) => {
        const nextValues = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        onChange?.(nextValues);
    };

    return (
        <div className="picker-container">
            <select multiple value={selectedValues} onChange={handleChange} size={Math.min(Math.max(options.length, 4), 10)}      >
                {options.length === 0 ? (
                    <option value="">No options available</option>
                ) : (
                    options.map((option, index) => (
                        <option key={`${option}-${index}`} value={option}>
                            {option}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default MultiPicker;
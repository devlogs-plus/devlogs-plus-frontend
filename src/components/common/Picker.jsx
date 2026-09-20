const Picker = ({ options, selectedValue, onChange }) => {
    if (!Array.isArray(options)) {
        return <p>thing is not an array</p>
    }

    return (
        <div className="picker-container">
            <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
                <option value="" disabled>-- Select an option --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Picker;

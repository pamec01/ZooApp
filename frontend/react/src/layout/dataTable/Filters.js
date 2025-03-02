import React from "react";

// text search input
export function TextSearchFilter({
                                     column: { filterValue, preFilteredRows, setFilter }
                                 }) {
    return (
        <input
            className="form-control"
            type={"text"}
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Hledej...`}
        />
    );
}

// a dropdown list filter
export function DropdownFilter({
                                   column: { filterValue, setFilter, preFilteredRows, id }
                               }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            className={"form-control"}
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">Všechny</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

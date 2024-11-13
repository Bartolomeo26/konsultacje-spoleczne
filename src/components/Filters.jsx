import { useState } from "react";
import FilterInput from "./Forms/Inputs/FilterInput";

function Filters({ onSearch })
{
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (value) =>
    {
        setSearchTerm(value);
        onSearch(value); // Przekaż frazę do rodzica
    };

    return (
        <div className="flex w-96 justify-center items-center md:flex-row md:justify-center md:items-end space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <FilterInput label="Search" onChange={handleSearchChange} />
        </div>
    );
}

export default Filters;

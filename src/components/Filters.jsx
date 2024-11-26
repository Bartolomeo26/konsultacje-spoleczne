import { useState } from "react";
import FilterInput from "./Forms/Inputs/FilterInput";
import SortInput from "./Forms/Inputs/SortInput";

// Sorting options with their corresponding API parameters


function Filters({ searchPlaceholder, onSearch, onSort, SORTING_OPTIONS })
{
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("id_desc"); // Default to most recent

    const handleSearchChange = (value) =>
    {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleSortChange = (e) =>
    {
        const selectedSort = e.target.value;
        setSortOption(selectedSort);

        // Find the selected option to extract field and order
        const sortConfig = SORTING_OPTIONS.find(option => option.value === selectedSort);
        onSort({
            field: sortConfig.field,
            order: sortConfig.order
        });
    }

    return (
        <div className="flex justify-center items-center lg:w-96 max-w-xl space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full">
                {searchPlaceholder && <FilterInput label="Search" onChange={handleSearchChange} placeholder={searchPlaceholder} />}
            </div>
            <SortInput SORTING_OPTIONS={SORTING_OPTIONS} sortOption={sortOption} handleSortChange={handleSortChange} />
        </div>
    );
}

export default Filters;
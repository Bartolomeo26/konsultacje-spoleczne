import { useState } from "react";
import FilterInput from "./Forms/Inputs/FilterInput";
import SortInput from "./Forms/Inputs/SortInput";




function Filters({ searchPlaceholder, onSearch, onSort, SORTING_OPTIONS })
{
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("id_desc"); 

    const handleSearchChange = (value) =>
    {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleSortChange = (e) =>
    {
        const selectedSort = e.target.value;
        setSortOption(selectedSort);

        
        const sortConfig = SORTING_OPTIONS.find(option => option.value === selectedSort);
        onSort({
            field: sortConfig.field,
            order: sortConfig.order
        });
    }

    return (
        <div className="flex justify-center items-center max-w-[400px] gap-2 lg:gap-0  md:space-y-0 md:space-x-4">

            {searchPlaceholder && <FilterInput label="Search" onChange={handleSearchChange} placeholder={searchPlaceholder} />}

            <SortInput SORTING_OPTIONS={SORTING_OPTIONS} sortOption={sortOption} handleSortChange={handleSortChange} />
        </div>
    );
}

export default Filters;
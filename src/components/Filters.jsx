import { useState } from "react";
import FilterInput from "./Forms/Inputs/FilterInput";
import { ArrowUpDown } from "lucide-react";

// Sorting options with their corresponding API parameters
const SORTING_OPTIONS = [
    { value: "id_desc", label: "Most Recent", field: "Id", order: "desc" },
    { value: "id_asc", label: "Oldest", field: "Id", order: "asc" },
    { value: "name_asc", label: "Name (A-Z)", field: "Name", order: "asc" },
    { value: "name_desc", label: "Name (Z-A)", field: "Name", order: "desc" }
];

function Filters({ onSearch, onSort })
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
        <div className="flex flex-col md:flex-row justify-center items-center w-96 max-w-xl space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="w-full">
                <FilterInput label="Search" onChange={handleSearchChange} />
            </div>
            <div className="w-80 relative ">
                <label htmlFor="sort-order" className="block mb-2 text-sm font-semibold text-gray-700">
                    Sort By
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg hover:bg-slate-200 focus-within:border-blue-500 transition-all">
                    <select
                        id="sort-order"
                        name="sort-order"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="w-full p-3 rounded-lg outline-none appearance-none bg-transparent "
                    >
                        {SORTING_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ArrowUpDown className="mr-3 text-gray-400 absolute right-0" />
                </div>
            </div>
        </div>
    );
}

export default Filters;
import { useState } from "react";
import CommunitiesList from "../components/CommunitiesList";
import Filters from "../components/Filters";

const SORTING_OPTIONS = [
    { value: "id_desc", label: "Most Recent", field: "Id", order: "desc" },
    { value: "id_asc", label: "Oldest", field: "Id", order: "asc" },
    { value: "name_asc", label: "Name (A-Z)", field: "Name", order: "asc" },
    { value: "name_desc", label: "Name (Z-A)", field: "Name", order: "desc" }
];

function Communities()
{
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        field: "Id",
        order: "desc"
    });

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-3xl mb-10">List of All Communities</h1>
            <div className="mb-3">
                <Filters
                    searchPlaceholder={'Downtown'}
                    onSearch={setSearchTerm}
                    onSort={setSortConfig}
                    SORTING_OPTIONS={SORTING_OPTIONS}
                />
            </div>
            <CommunitiesList
                searchTerm={searchTerm}
                sortField={sortConfig.field}
                sortOrder={sortConfig.order}
            />
        </div>
    );
}

export default Communities;
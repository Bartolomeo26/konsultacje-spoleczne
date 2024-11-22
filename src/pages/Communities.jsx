import { useState } from "react";
import CommunitiesList from "../components/CommunitiesList";
import Filters from "../components/Filters";

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
            <Filters
                onSearch={setSearchTerm}
                onSort={setSortConfig}
            />
            <CommunitiesList
                searchTerm={searchTerm}
                sortField={sortConfig.field}
                sortOrder={sortConfig.order}
            />
        </div>
    );
}

export default Communities;
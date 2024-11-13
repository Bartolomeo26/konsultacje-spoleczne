import { useState } from "react";
import CommunitiesList from "../components/CommunitiesList";
import Filters from "../components/Filters";

function Communities()
{
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-3xl mb-10">List of All Communities</h1>
            <Filters onSearch={setSearchTerm} />
            <CommunitiesList searchTerm={searchTerm} />
        </div>
    );
}

export default Communities;

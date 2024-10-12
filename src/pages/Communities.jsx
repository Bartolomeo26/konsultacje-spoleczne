import CommunitiesList from "../components/CommunitiesList";
import Filters from "../components/Filters";

function Communities()
{

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="text-3xl mb-10">List of All Communities</h1>
                <Filters />
                <CommunitiesList />
            </div>
        </>
    )

}

export default Communities;
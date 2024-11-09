
import FilterInput from "./Forms/Inputs/FilterInput";
import SelectInput from "./Forms/Inputs/SelectInput";


function Filters()
{

    return (
        <>
            <div className="flex justify-center items-center md:flex-row md:justify-center md:items-end space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-4 w-full md:w-auto">
                    <FilterInput label={"Name"} />
                    <FilterInput label={"Location"} />
                    <SelectInput />
                </div>
                <div className=" md:mt-0">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Search
                    </button>
                </div>
            </div>
        </>
    )

}

export default Filters;
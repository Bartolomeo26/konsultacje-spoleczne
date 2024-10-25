
import FilterInput from "./Forms/Inputs/FilterInput";
import SelectInput from "./Forms/Inputs/SelectInput";


function Filters()
{

    return (
        <>
            <div className="flex justify-center flex-col items-end ">

                <div className="flex gap-4">
                    <FilterInput label={"Name"} />
                    <FilterInput label={"Location"} />
                    <FilterInput label={"Start Year"} number />
                    <FilterInput label={"End Year"} number />
                    <SelectInput />

                </div>
                <div className=" mt-2">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
                </div>
            </div>
        </>
    )

}

export default Filters;
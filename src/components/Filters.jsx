
import SelectInput from "./Forms/Inputs/SelectInput";
import SimpleInput from "./Forms/Inputs/SimpleInput";

function Filters()
{

    return (
        <>
            <div className="flex justify-center flex-col items-end ">

                <div className="flex gap-4">
                    <SimpleInput label={"Name"} />
                    <SimpleInput label={"Location"} />
                    <SimpleInput label={"Start Year"} number />
                    <SimpleInput label={"End Year"} number />
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
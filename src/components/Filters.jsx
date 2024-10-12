import SubmitButton from "./Forms/Buttons/Button";
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
                    <SubmitButton text={"Search"} />
                </div>
            </div>
        </>
    )

}

export default Filters;
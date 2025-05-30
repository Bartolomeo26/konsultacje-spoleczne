import { ArrowUpDown } from "lucide-react";

function SortInput({ SORTING_OPTIONS, sortOption, handleSortChange })
{
    return (
        <div className="min-w-[150px] relative ">

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
    )
}

export default SortInput;
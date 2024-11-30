import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../../../util/fetch";
import { useParams } from "react-router-dom";

function ConsultationSolutions()
{
    const [isExpanded, setIsExpanded] = useState(false);
    const { consultationId } = useParams();
    const {
        isPending,
        error,
        data: solutions,
    } = useQuery({
        queryKey: ["solutions"],
        queryFn: () => getSolutions(consultationId),
        retry: 0,
    });

    return (<>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 pb-3 hover:border-gray-300 transition-colors mt-3">
            <div>
                {!solutions ? <div><h1>No solutions found.</h1></div> :
                    <div>
                        <div className="flex flex-col space-y-4">
                            <p className="text-gray-600 text-lg font-semibold flex items-center gap-1"><Lightbulb size={18} /> Solutions</p>
                            <h1 className="text-3xl font-semibold ps-3 text-gray-900">
                                Solution #1
                            </h1>
                            <p className="text-lg text-gray-700 ps-3 leading-relaxed">
                                Disband Legia
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-md text-gray-700 leading-relaxed">

                            </p>
                        </div></div>}
            </div>

        </div>
    </>)
}
export default ConsultationSolutions;
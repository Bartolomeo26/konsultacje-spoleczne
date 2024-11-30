import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../../../util/fetch";
import { useParams } from "react-router-dom";
import NewSolution from './NewSolution';

function SolutionsList({ issueStatus })
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

    return (
        <>
            <div
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-3 relative 
                    transition-all duration-300 ease-in-out
                    ${!isExpanded ? 'cursor-pointer' : ''}
                    ${isExpanded ? 'max-h-[1000px] overflow-visible' : 'max-h-16 overflow-hidden'}
                `}
            >
                {issueStatus < 4 && <NewSolution consultationId={consultationId} />}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute top-2 right-2 z-10 
                        bg-cyan-800 hover:bg-cyan-700 
                        text-white p-1 rounded-lg 
                        shadow-lg transition-colors
                        transform hover:scale-105"
                >
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </button>

                <div className="absolute top-2 left-3 text-gray-500 flex items-center">
                    <Lightbulb className="mr-1 text-gray-600" size={18} />
                    <h3 className="text-lg text-gray-600 font-semibold">Discussed Solutions</h3>
                </div>

                {isExpanded && (
                    <div className="flex flex-col space-y-4 mt-8">
                        {error && <div><h1>No solutions found.</h1></div>}
                        {console.log(solutions)}
                        {!error && solutions?.value?.map((solution) => (
                            <div
                                key={solution.id}
                                className="border border-gray-200 rounded-lg p-4 shadow-sm"
                            >
                                <h2 className="text-xl font-semibold text-gray-900">{solution.title}</h2>
                                <p className="text-gray-700 mt-2">{solution.description}</p>

                                {solution.files?.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-800">Files:</h3>
                                        <ul className="list-disc list-inside">
                                            {solution.files.map((file) => (
                                                <li key={file.id}>
                                                    <a
                                                        href={`data:image/jpeg;base64,${file.data}`}
                                                        download={file.description}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {file.description}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SolutionsList;

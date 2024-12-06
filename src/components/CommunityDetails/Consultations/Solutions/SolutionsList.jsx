import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../../../util/fetch";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NewSolution from './NewSolution';
import SolutionCard from "./SolutionCard";
import { useAuth } from "../../../../util/AuthContext";

function SolutionsList({ issueStatus, permissions })
{
    const [isExpanded, setIsExpanded] = useState(false);
    const { loggedUser = null } = useAuth();
    const { consultationId } = useParams();
    const {
        isPending,
        error,
        data: solutions,
    } = useQuery({
        queryKey: ["solutions", consultationId],
        queryFn: () => getSolutions(consultationId),
        retry: 0,
    });

    const hasVoted = solutions?.value?.some((solution) =>
        solution.userVotes?.some((vote) => vote.id === loggedUser?.id)
    );

    const sortedSolutions = solutions?.value
        ?.sort((a, b) => b.userVotes.length - a.userVotes.length) || [];

    const highestVotes = sortedSolutions[0]?.userVotes.length || 0;

    return (
        <div
            className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-3 mb-3 relative 
                transition-all duration-1000 ease-in-out
                ${!isExpanded ? 'cursor-pointer' : ''}
                ${isExpanded ? 'max-h-[1000px] overflow-visible' : 'max-h-16 overflow-hidden'}
            `}
        >
            {issueStatus === 0 && permissions.isAdmin && <NewSolution consultationId={consultationId} />}

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
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
                            No solutions found.
                        </div>
                    )}

                    <AnimatePresence>
                        {!error && sortedSolutions.map((solution) => (
                            <motion.div
                                key={solution.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    transition: { duration: 0.2 }
                                }}
                                className="origin-top"
                            >
                                <SolutionCard
                                    permissions={permissions}
                                    solution={solution}
                                    hasVoted={hasVoted}
                                    issueStatus={issueStatus}
                                    {...(solution.userVotes.length === highestVotes && issueStatus > 1 && { won: true })}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default SolutionsList;
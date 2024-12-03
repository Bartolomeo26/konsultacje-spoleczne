import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { upVoteSolution } from '../../../../util/fetch';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../../../util/AuthContext";

const SolutionVote = ({ solution, hasVoted }) =>
{
    const { loggedUser = null } = useAuth();
    const queryClient = useQueryClient();
    const { consultationId } = useParams();

    const isInitiallyVoted = solution.userVotes?.some(vote => vote.id === loggedUser?.id);

    const [isVoted, setIsVoted] = useState(isInitiallyVoted);

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: upVoteSolution,
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ['solutions', consultationId] });
            // Update vote state after successful upvote
            setIsVoted(!isVoted);
        },
        onError: (error) =>
        {
            console.error("Failed to upvote solution:", error);
            // Optionally, revert `isVoted` in case of an error
        },
    });

    const handleVote = () =>
    {
        if (isPending) return; // Prevent multiple clicks while processing
        mutate(solution?.id); // Trigger the API call
    };

    return (
        <button
            onClick={handleVote}
            className={`
                w-28
                self-start
                flex items-center
                justify-center 
                px-1 py-1.5 
                rounded-md 
                transition-all 
                duration-200 
                ease-in-out 
                ${isVoted
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            `}
            disabled={isPending || (hasVoted && !isVoted)}
        >
            <ThumbsUp
                size={16}
                className={`mr-1 ${isVoted ? 'text-blue-600' : 'text-gray-500'}`}
            />
            <span className="font-medium">
                {solution.userVotes?.length || 0} Votes
            </span>
        </button>
    );
};

export default SolutionVote;

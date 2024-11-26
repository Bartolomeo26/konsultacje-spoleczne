import { Plus, InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { formatDateTime } from '../../../../util/formatDate';
import defaultProfile from '../../../../assets/defaultProfile.jpg'
import { useMutation } from '@tanstack/react-query';
import { upVoteComment } from '../../../../util/fetch';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../util/AuthContext';
import IssueStatusTag from './IssueStatusTag';
import Tooltip from '../../../Tooltip';


function CommentCard({ reply, comment })
{
    const { loggedUser = null } = useAuth();
    const { consultationId } = useParams();
    const [upvotes, setUpvotes] = useState(comment.upvotes.length);
    const [hasUpvoted, setHasUpvoted] = useState(
        comment.upvotes.some(upvote => upvote.id === loggedUser?.id)
    );
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: () => upVoteComment(comment.id),
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ['comments', consultationId] })


        },
        onError: (error) =>
        {
            console.error("Error upvoting comment:", error);
        },
    });


    const handleUpvote = () =>
    {
        mutate();
        if (hasUpvoted)
        {
            // Undo upvote
            setUpvotes(prevUpvotes => prevUpvotes - 1);
            setHasUpvoted(false);
        } else
        {
            // Add upvote
            setUpvotes(prevUpvotes => prevUpvotes + 1);
            setHasUpvoted(true);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 
                        p-6 hover:border-gray-300 transition-colors relative">
            <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-500">
                <span>{formatDateTime(comment.createdAt)}</span>
                <Tooltip content={<IssueStatusTag status={comment.issueStatus} />}>
                    <InfoIcon className="w-4 h-4" />
                </Tooltip>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {comment.author.avatar ? (
                            <img
                                src={`data:image/jpeg;base64,${comment.author.avatar.data}`}
                                alt={`${comment.author.name} ${comment.author.surname}'s avatar`}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <img
                                src={defaultProfile}
                                alt={`${comment.author.name} ${comment.author.surname}'s avatar`}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}
                        <p className="text-gray-600">{comment.author.name} {comment.author.surname}</p>
                    </div>

                </div>
                <p className="text-lg mt-3 text-gray-900">{comment.content}</p>

                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={() => reply(`${comment.author.name} ${comment.author.surname}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                        font-medium text-gray-700 bg-gray-100 rounded-lg 
                        hover:bg-gray-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                        </svg>
                        Reply
                    </button>

                    <button
                        onClick={handleUpvote}
                        className={`inline-flex items-center justify-center px-2 py-2 
                            rounded-lg font-medium text-sm transition-colors min-w-14
                            ${hasUpvoted
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <Plus size={20} className='w-1/2' />
                        <span className='text-base w-1/2'>{upvotes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;
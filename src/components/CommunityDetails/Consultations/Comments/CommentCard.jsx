import { Plus, InfoIcon, Redo2 } from 'lucide-react';
import { useState } from 'react';
import { formatDateTime } from '../../../../util/formatDate';
import defaultProfile from '../../../../assets/defaultProfile.jpg'
import { useMutation } from '@tanstack/react-query';
import { upVoteComment } from '../../../../util/fetch';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../../util/AuthContext';
import IssueStatusTag from './IssueStatusTag';
import Tooltip from '../../../Tooltip';
import UpvotesModal from './UpvotesModal';

function CommentCard({ reply, comment })
{
    const { loggedUser = null } = useAuth();
    const isAuthor = loggedUser.id === comment?.author.id;
    const { consultationId } = useParams();
    const [upvotes, setUpvotes] = useState(comment?.upvotes.length);
    const [hasUpvoted, setHasUpvoted] = useState(
        comment?.upvotes.some(upvote => upvote.id === loggedUser?.id)
    );

    const [showUpvotesModal, setShowUpvotesModal] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: () => upVoteComment(comment?.id),
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
                <span>{formatDateTime(comment?.createdAt)}</span>
                <Tooltip content={<IssueStatusTag status={comment?.issueStatus} />}>
                    <InfoIcon className="w-4 h-4" />
                </Tooltip>

            </div>

            <div className="space-y-4">
                <Link to={`/users/${comment?.author.id}`} className='inline-block'>
                    <div className="flex items-center gap-2">
                        {comment?.author.avatar ? (
                            <img
                                src={`data:image/jpeg;base64,${comment?.author.avatar.data}`}
                                alt={`${comment?.author.name} ${comment?.author.surname}'s avatar`}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <img
                                src={defaultProfile}
                                alt={`${comment?.author.name} ${comment?.author.surname}'s avatar`}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}
                        <p className="text-gray-600">{comment?.author.name} {comment?.author.surname}</p>
                    </div>
                </Link>

                <p className="text-lg mt-3 text-gray-900">{comment?.content}</p>

                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={() => reply(`${comment?.author.name} ${comment?.author.surname}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                        font-medium text-gray-700 bg-gray-100 rounded-lg 
                        hover:bg-gray-200 transition-colors"
                    >
                        <Redo2 size={24} />
                        Reply
                    </button>
                    <div className="flex items-center">
                        <button onClick={handleUpvote} className={`flex items-center justify-center h-10 w-14 min-w-14 px-2 py-2 rounded-l-lg transition-colors border-r border-gray-300 ${hasUpvoted ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                            <div className='w-1/2 flex justify-end'><Plus size={16} /></div>
                        </button>
                        <button onClick={() => setShowUpvotesModal(true)} className={`flex items-center justify-center h-10 w-14 min-w-14 px-2 py-2 rounded-r-lg transition-colors ${hasUpvoted ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                            <span className='text-base'>{upvotes}</span>
                        </button>
                    </div>
                    {showUpvotesModal && (
                        <UpvotesModal
                            upvotes={comment?.upvotes}
                            onClose={() => setShowUpvotesModal(false)}
                        />
                    )}
                </div>
            </div>
        </div >
    );
}

export default CommentCard;
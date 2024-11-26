import { useState } from 'react';

function CommentCard({ reply, comment })
{
    const [upvotes, setUpvotes] = useState(200);
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const handleUpvote = () =>
    {
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

            <div className="absolute top-4 right-4 text-sm text-gray-500">
                Nov 26, 2024
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-gray-600">{comment.author.name} {comment.author.surname}</p>
                    <p className="text-xl mt-2 text-gray-900">{comment.content}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={reply}
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
                        className={`inline-flex items-center gap-1 px-4 py-2 
                                    rounded-lg font-medium text-sm transition-colors
                                    ${hasUpvoted
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>{upvotes}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;
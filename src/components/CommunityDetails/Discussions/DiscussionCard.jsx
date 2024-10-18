function DiscussionCard({ discussion })
{
    return (
        <div className="border-2 rounded-md border-black p-4 mt-4 w-full">
            <h1 className="font-bold text-lg mb-2">{discussion.topic}</h1>
            <p className="mb-4">
                {discussion.description}
            </p>
            <div className="flex justify-between text-md">
                <span>Date: {discussion.date}</span>
                <span>Answers: 201</span>
            </div>
        </div>
    );

}

export default DiscussionCard;
import { Link } from "react-router-dom";

function DiscussionCard({ discussion })
{
    return (
        <Link to="/communities/1/discussions/1">
            <div className="border-2 rounded-md border-black p-4 mt-4 w-full">
                <div className="flex ">
                    <h1 className="font-bold text-lg mb-2 w-4/6">{discussion.topic}</h1>
                    <span className="text-md w-2/6 ms-auto text-end">Author: Andrzej Nowicki</span>
                </div>
                <p className="mb-4">
                    {discussion.description}
                </p>
                <div className="flex justify-between text-md">
                    <span>Date: {discussion.date}</span>
                    <span>Answers: 201</span>
                </div>
            </div>
        </Link>
    );

}

export default DiscussionCard;
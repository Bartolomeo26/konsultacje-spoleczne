import { Link } from "react-router-dom";
import DiscussionAnswer from "../components/CommunityDetails/Discussions/DiscussionAnswer";
import DiscussionInput from "../components/CommunityDetails/Discussions/DiscussionInput";
import DiscussionTopic from "../components/CommunityDetails/Discussions/DiscussionTopic";
import { useState } from "react";

function DiscussionDetails()
{
    const [answer, setAnswer] = useState('');
    function reply()
    {
        setAnswer('@Stefan Stefanski ' + answer);

    }
    function handleInput(e)
    {
        setAnswer(e.target.value);

    }
    return (<>
        <div className="flex flex-col w-3/4 mt-10">
            <Link to="/communities/1/discussions">
                <div className="rounded-3xl p-1 bg-slate-300 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </div>
            </Link>
            <DiscussionTopic />
            <DiscussionInput handleInput={handleInput} value={answer} />
            <div>
                <h1 className="text-2xl mt-2">51 Answers</h1>
            </div>
            <div className="flex flex-col gap-5 mt-2 mb-10">
                <DiscussionAnswer reply={reply} />
                <DiscussionAnswer />
                <DiscussionAnswer />
            </div>
        </div>
    </>)
}

export default DiscussionDetails;
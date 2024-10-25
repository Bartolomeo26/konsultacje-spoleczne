import { Link } from "react-router-dom";
import DiscussionAnswer from "../components/CommunityDetails/Discussions/DiscussionAnswer";
import DiscussionInput from "../components/CommunityDetails/Discussions/DiscussionInput";
import DiscussionTopic from "../components/CommunityDetails/Discussions/DiscussionTopic";
import { useState, useRef } from "react";


function DiscussionDetails()
{
    const [answer, setAnswer] = useState('');
    const inputRef = useRef(null);
    function reply()
    {
        setAnswer('@Stefan Stefanski ' + answer);
        inputRef.current.focus();

    }
    function handleInput(e)
    {
        setAnswer(e.target.value);

    }
    return (<>
        <div className="flex flex-col w-3/4 relative">
            <div className='absolute top-0 border-b-4 self-center border-s-4 border-e-4 p-4 rounded-b-lg bg-slate-200' style={{ borderColor: "#155e75" }}>
                <h1 className='text-xl text-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline-block mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg> Status: Ongoing</h1>
            </div>
            <div className="mt-14">
                <Link to="/communities/1/discussions">
                    <div className="rounded-3xl p-1 bg-slate-300 inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </div>
                </Link>
                <DiscussionTopic />
                <DiscussionInput handleInput={handleInput} value={answer} inputRef={inputRef} />
                <div>
                    <h1 className="text-2xl mt-2">201 Answers</h1>
                </div>
                <div className="flex flex-col gap-5 mt-2 mb-10">
                    <DiscussionAnswer reply={reply} />
                    <DiscussionAnswer />
                    <DiscussionAnswer />
                </div>
            </div>
        </div>
    </>)
}

export default DiscussionDetails;
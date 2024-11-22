import { Link } from "react-router-dom";
import ConsultationAnswer from "../components/CommunityDetails/Consultations/ConsultationAnswer";
import ConsultationInput from "../components/CommunityDetails/Consultations/ConsultationInput";
import ConsultationTopic from "../components/CommunityDetails/Consultations/ConsultationTopic";
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
            <div className="relative mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-cyan-800 text-white px-8 py-3 rounded-b-xl shadow-lg">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline-block mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        <span className="font-medium">Status: Ongoing</span>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Link to="/communities/1/consultations">
                    <button className="mb-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </Link>
                <ConsultationTopic />
                <ConsultationInput handleInput={handleInput} value={answer} inputRef={inputRef} />
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">201 Answers</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-5 mt-2 mb-10">
                            <ConsultationAnswer reply={reply} />
                            <ConsultationAnswer />
                            <ConsultationAnswer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default DiscussionDetails;
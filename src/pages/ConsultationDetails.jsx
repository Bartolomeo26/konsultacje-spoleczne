import { Link } from "react-router-dom";
import CommentCard from "../components/CommunityDetails/Consultations/Comments/CommentCard";
import CommentInput from "../components/CommunityDetails/Consultations/Comments/CommentInput";
import ConsultationTopic from "../components/CommunityDetails/Consultations/ConsultationTopic";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getIssue } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import { MessageCircle, Vote } from "lucide-react";
import { formatDateTime } from "../util/formatDate";
import ConsultationFiles from "../components/CommunityDetails/Consultations/ConsultationFiles";
import ConsultationSolutions from "../components/CommunityDetails/Consultations/ConsultationSolutions";


function ConsultationDetails()
{
    const [answer, setAnswer] = useState('');
    const { id, consultationId } = useParams();

    const inputRef = useRef(null);
    const { isPending, error, data: consultation } = useQuery({
        queryKey: ['issue', consultationId],
        queryFn: () => getIssue(consultationId)
    });
    let statusIcon = <MessageCircle size={26} />
    let statusName = '';
    if (consultation?.issueStatus === 0)
    {
        statusName = 'Gathering Information'

    }
    else if (consultation?.issueStatus === 1)
    {
        statusName = 'Voting'
        statusIcon = <Vote size={26} />
    }
    else if (consultation?.issueStatus === 2)
    {
        statusName = "In Progress";
        statusIcon = <MessageCircle size={26} />
    }
    else if (consultation?.issueStatus === 3)
    {
        statusName = 'Feedback Collection'
        statusIcon = <MessageCircle size={26} />
    }
    else if (consultation?.issueStatus === 4)
    {
        statusName = 'Completed'
        statusIcon = <MessageCircle size={26} />
    }
    function reply()
    {
        setAnswer('@Stefan Stefanski ' + answer);
        inputRef.current.focus();

    }
    function handleInput(e)
    {
        setAnswer(e.target.value);

    }
    if (isPending) return <LoadingIndicator />
    if (error) return 'An error has occurred: ' + error.message;

    return (<>
        <div className="flex flex-col w-3/4 relative">
            <div className="relative mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-cyan-800 text-white px-8 py-3 rounded-b-xl shadow-lg">
                    <div className="flex items-center gap-2">
                        {statusIcon}
                        <span className="font-medium">Status: {statusName}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Link to={`/communities/${id}/consultations`}>
                    <button className="mb-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </Link>
                <ConsultationTopic consultation={{ title: consultation?.title, description: consultation?.description, date: consultation?.createdAt }} />
                <ConsultationFiles files={consultation.files} />
                <ConsultationSolutions solutions={consultation.solutions} />
                <CommentInput handleInput={handleInput} value={answer} inputRef={inputRef} issueStatus={consultation?.issueStatus} />
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">201 Answers</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-5 mt-2 mb-10">
                            <CommentCard reply={reply} />
                            <CommentCard />
                            <CommentCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ConsultationDetails;
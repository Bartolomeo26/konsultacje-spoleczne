import { Link } from "react-router-dom";
import CommentCard from "../components/CommunityDetails/Consultations/Comments/CommentCard";
import CommentInput from "../components/CommunityDetails/Consultations/Comments/CommentInput";
import ConsultationTopic from "../components/CommunityDetails/Consultations/ConsultationTopic";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommunity, getIssue } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import { Clock, MessageCircle, Vote } from "lucide-react";
import { formatDateTime } from "../util/formatDate";
import ConsultationFiles from "../components/CommunityDetails/Consultations/ConsultationFiles";
import ConsultationSolutions from "../components/CommunityDetails/Consultations/ConsultationSolutions";
import CommentsList from "../components/CommunityDetails/Consultations/Comments/CommentsList";
import { useAuth } from "../util/AuthContext";



function ConsultationDetails()
{
    const { loggedUser = null } = useAuth();
    const [comment, setComment] = useState('');
    const { id, consultationId } = useParams();

    const inputRef = useRef(null);
    const { isPending, error, data: consultation } = useQuery({
        queryKey: ['issue', consultationId],
        queryFn: () => getIssue(consultationId)
    });

    const { data: community } = useQuery({
        queryKey: ['community', id],
        queryFn: () => getCommunity(id)
    });

    const permissions = community && loggedUser ? {
        isAdmin: community?.administrators.some(admin => admin.id === loggedUser.id),
        isMember: community?.members.some(member => member.id === loggedUser.id)
    } : { isAdmin: false, isMember: false };


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
    function reply(user)
    {
        setComment(`@${user} ` + comment);
        inputRef.current.focus();

    }
    function handleInput(e)
    {
        setComment(e.target.value);

    }
    if (isPending) return <LoadingIndicator />
    if (error) return 'An error has occurred: ' + error.message;

    return (<>
        <div className="flex flex-col w-3/4 relative">
            <div className="relative mb-6">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-cyan-800 text-white px-8 py-3 rounded-b-xl shadow-lg">
                    <div className="flex items-center justify-center gap-2 text-lg">
                        {statusIcon}
                        <span className="font-semibold">Status: {statusName}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm mt-1.5 gap-1">
                        <Clock size={16} />
                        <span>End date:</span> <span className="font-medium">{formatDateTime(consultation.currentStateEndDate)}</span>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                <Link to={`/communities/${id}/consultations`}>
                    <button className="mb-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </Link>
                <ConsultationTopic consultation={consultation} permissions={permissions} />
                <ConsultationFiles files={consultation?.files} />
                <ConsultationSolutions solutions={consultation?.solutions} />
                <CommentInput handleInput={handleInput} value={comment} inputRef={inputRef} issueStatus={consultation?.issueStatus} />
                <CommentsList reply={reply} />
            </div>
        </div>
    </>)
}

export default ConsultationDetails;
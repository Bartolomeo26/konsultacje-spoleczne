import { Link } from "react-router-dom";
import CommentInput from "../components/CommunityDetails/Consultations/Comments/CommentInput";
import ConsultationTopic from "../components/CommunityDetails/Consultations/ConsultationTopic";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommunity, getIssue } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import { formatDateTime } from "../util/formatDate";
import ConsultationFiles from "../components/CommunityDetails/Consultations/ConsultationFiles";
import ConsultationSolutions from "../components/CommunityDetails/Consultations/Solutions/ConsultationSolutions";
import CommentsList from "../components/CommunityDetails/Consultations/Comments/CommentsList";
import { useAuth } from "../util/AuthContext";
import ConsultationStatus from "../components/CommunityDetails/Consultations/ConsultationStatus";
import ConsultationStatusUpdate from "../components/CommunityDetails/Consultations/ConsultationStatusUpdate";



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
        <div className="flex flex-col w-11/12 lg:w-3/4 relative">

            <ConsultationStatus issueStatus={consultation?.issueStatus} currentStateEndDate={consultation?.currentStateEndDate} />

            <div className="mt-14">
                <Link to={`/communities/${id}/consultations`}>
                    <button className="mb-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                </Link>
                <ConsultationTopic consultation={consultation} permissions={permissions} />
                <ConsultationFiles files={consultation?.files} />
                <ConsultationSolutions />
                <CommentInput handleInput={handleInput} value={comment} inputRef={inputRef} issueStatus={consultation?.issueStatus} />
                <CommentsList reply={reply} />
            </div>
            <ConsultationStatusUpdate currentStateEndDate={consultation?.currentStateEndDate} issueStatus={consultation?.issueStatus} />
        </div>
    </>)
}

export default ConsultationDetails;
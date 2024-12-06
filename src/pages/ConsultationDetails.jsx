import { Link } from "react-router-dom";
import CommentInput from "../components/CommunityDetails/Consultations/Comments/CommentInput";
import ConsultationTopic from "../components/CommunityDetails/Consultations/ConsultationTopic";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommunity, getIssue } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import ConsultationFiles from "../components/CommunityDetails/Consultations/ConsultationFiles";
import SolutionsList from "../components/CommunityDetails/Consultations/Solutions/SolutionsList";
import CommentsList from "../components/CommunityDetails/Consultations/Comments/CommentsList";
import { useAuth } from "../util/AuthContext";
import ConsultationStatus from "../components/CommunityDetails/Consultations/ConsultationStatus";
import ConsultationStatusUpdate from "../components/CommunityDetails/Consultations/ConsultationStatusUpdate";
import Alert from "../components/Alert";

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
    } : { isAdmin: 'unknown', isMember: 'unknown' };

    if (!permissions.isAdmin && !permissions.isMember)
    {


        return <div className="mt-10 w-1/2 flex justify-center"> <Alert
            type="danger"
            message={{
                title: 'No permission',
                text: 'You have no permission to view consultations in this community.'
            }}
        /></div>
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
                <ConsultationTopic consultation={consultation} permissions={permissions} issueStatus={consultation?.issueStatus} admin={community?.administrators[0]} />
                <ConsultationFiles initialFiles={consultation?.files} permissions={permissions} issueStatus={consultation?.issueStatus} />
                <SolutionsList issueStatus={consultation?.issueStatus} permissions={permissions} />
                {consultation?.issueStatus < 4 ? <CommentInput handleInput={handleInput} value={comment} inputRef={inputRef} issueStatus={consultation?.issueStatus} /> :
                    <div className="w-3/5"> <Alert
                        type="info"
                        message={{

                            text: 'You cannot comment when the consultation status reached completed phase.'
                        }}
                    /></div>}
                <CommentsList reply={reply} admin={community?.administrators[0]} />
            </div>
            <ConsultationStatusUpdate permissions={permissions} currentStateEndDate={consultation?.currentStateEndDate} issueStatus={consultation?.issueStatus} />
        </div>
    </>)
}

export default ConsultationDetails;
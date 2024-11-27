import { useParams } from "react-router-dom";
import CommunityHeader from "../components/CommunityDetails/CommunityHeader";
import CommunityMain from "../components/CommunityDetails/CommunityMain";
import CommunityFooter from "../components/CommunityDetails/CommunityFooter";
import ConsultationsList from "../components/CommunityDetails/Consultations/ConsultationsList";
import CommunityNavigation from "../components/CommunityDetails/CommunityNavigation";
import CommunityBasicInfo from "../components/CommunityDetails/CommunityBasicInfo";
import SurveysList from "../components/CommunityDetails/Surveys/SurveysList";
import JoinRequests from "../components/CommunityDetails/JoinRequests/JoinRequestsList";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "../util/fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import { useAuth } from "../util/AuthContext";
import CommunityAdminInfo from "../components/CommunityDetails/CommunityAdminInfo";
import Alert from "../components/Alert";
import MembersList from "../components/CommunityDetails/Members/MembersList";

function CommunityDetails()
{
    const { id, topic } = useParams();
    const { loggedUser = null } = useAuth();


    const { isPending, error, data: community } = useQuery({
        queryKey: ['community', id],
        queryFn: () => getCommunity(id)
    });
    const permissions = community && loggedUser ? {
        isAdmin: community?.administrators.some(admin => admin.id === loggedUser.id),
        isMember: community?.members.some(member => member.id === loggedUser.id)
    } : { isAdmin: false, isMember: false };
    console.log('permisje', permissions)
    const topics = ['consultations', 'surveys', 'members', 'join-requests']
    let communityContent;
    if (topic === undefined)
    {
        // "About" is visible to everyone
        communityContent = <CommunityMain community={community} />;
    } else if (topic === topics[0])
    {
        // ConsultationsList: visible if the group is public or user is an admin/member
        if (community?.isPublic || permissions.isAdmin || permissions.isMember)
        {
            communityContent = <ConsultationsList consultations={community?.issues} permissions={permissions} />;
        } else
        {
            communityContent = (
                <div className="flex flex-col w-full">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10 text-red-800">
                        <Alert message={{ title: "No permission", text: "You have no permission to view consultations in this community." }} />
                    </div>
                </div>
            );
        }
    } else if (topic === topics[1])
    {
        // SurveysList: visible if the group is public or user is an admin/member
        if (community?.isPublic || permissions.isAdmin || permissions.isMember)
        {
            communityContent = <SurveysList />;
        } else
        {
            communityContent = (
                <div className="flex flex-col w-full">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10 text-red-800">
                        <Alert message={{ title: "No permission", text: "You have no permission to view surveys in this community." }} />
                    </div>
                </div>
            );
        }
    } else if (topic === topics[2])
    {
        // MembersList: visible only to admins
        if (permissions.isAdmin)
        {
            communityContent = <MembersList members={community?.members} />;
        } else
        {
            communityContent = (
                <div className="flex flex-col w-full">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10 text-red-800">
                        <Alert message={{ title: "No permission", text: "Only admins can view the members of this community." }} />
                    </div>
                </div>
            );
        }
    } else if (topic === topics[3])
    {
        // JoinRequests: visible only to admins
        if (permissions.isAdmin)
        {
            communityContent = <JoinRequests joinRequests={community?.joinRequests} communityId={community?.id} />;
        } else
        {
            communityContent = (
                <div className="flex flex-col w-full">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10 text-red-800">
                        <Alert message={{ title: "No permission", text: "Only admins can view join requests for this community." }} />
                    </div>
                </div>
            );
        }
    } else
    {
        // Fallback: Topic not found
        communityContent = (
            <div className="flex flex-col w-full">
                <div className="w-full lg:w-4/5 flex flex-col justify-center p-6 mt-10">
                    <Alert message={{ title: "Not found", text: "What are you looking for? Such a content does not exist." }} />
                </div>
            </div>
        );
    }

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;
    return (
        <>
            <div className="flex flex-col w-full">
                <CommunityHeader community={community} permissions={permissions} />
                <div className="flex flex-col lg:px-28 mb-10 relative">
                    <CommunityNavigation permissions={permissions} joinRequests={community?.joinRequests} />
                    <CommunityBasicInfo community={community} />
                    <div>
                        {communityContent}
                    </div>
                </div>
                <CommunityFooter community={community} />
            </div>
        </>
    )
}

export default CommunityDetails;
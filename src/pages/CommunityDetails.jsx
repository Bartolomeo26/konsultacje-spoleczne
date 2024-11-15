import { useParams } from "react-router-dom";
import CommunityHeader from "../components/CommunityDetails/CommunityHeader";
import CommunityMain from "../components/CommunityDetails/CommunityMain";
import CommunityFooter from "../components/CommunityDetails/CommunityFooter";
import CommunityDiscussionsList from "../components/CommunityDetails/Discussions/DiscussionsList";
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

function CommunityDetails()
{
    const { id, topic } = useParams();
    const { loggedUser } = useAuth();


    const { isPending, error, data: community } = useQuery({
        queryKey: ['community', id],
        queryFn: () => getCommunity(id)
    });
    const permissions = community && loggedUser ? {
        isAdmin: community.administrators.some(admin => admin.id === loggedUser.id),
        isMember: community.members.some(member => member.id === loggedUser.id)
    } : { isAdmin: false, isMember: false };
    console.log('permisje', permissions)
    const topics = ['consultations', 'surveys', 'join-requests']
    let communityContent;
    if (topic === undefined)
    {
        communityContent = <CommunityMain community={community} />;
    }
    else if (community?.isPublic || (permissions.isAdmin || permissions.isMember))
    {
        if (topic === topics[0])
        {
            communityContent = <CommunityDiscussionsList />;
        }
        else if (topic === topics[1])
        {
            communityContent = <SurveysList />
        }
        else if (topic === topics[2])
        {
            communityContent = <JoinRequests joinRequests={community?.joinRequests} communityId={community?.id} />
        }
        else
        {
            communityContent = <div className="flex flex-col w-full">
                <div className="w-4/5 flex flex-col justify-center p-6 mt-10"><h1 className="text-2xl font-semibold">What are you looking for? Such a content does not exist</h1></div></div>
        }
    }
    else
    {
        communityContent = <div className="flex flex-col w-full">
            <div className="w-4/5 flex flex-col justify-center p-6 mt-10 text-red-800"><Alert message={{ title: "No permission", text: "You have no permission to see this content as you are neither an admin nor a member of this private community." }} /></div></div>
    }

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;
    return (
        <>
            <div className="flex flex-col w-full">
                <CommunityHeader community={community} permissions={permissions} />
                <div className="flex flex-col px-28 mb-10 relative">
                    <CommunityNavigation permissions={permissions} joinRequests={community.joinRequests} />

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
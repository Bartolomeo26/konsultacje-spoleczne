import { useParams } from "react-router-dom";
import CommunityHeader from "../components/CommunityDetails/CommunityHeader";
import CommunityMain from "../components/CommunityDetails/CommunityMain";
import CommunityFooter from "../components/CommunityDetails/CommunityFooter";
import CommunityDiscussionsList from "../components/CommunityDetails/Discussions/DiscussionsList";
import CommunityNavigation from "../components/CommunityDetails/CommunityNavigation";
import CommunityBasicInfo from "../components/CommunityDetails/CommunityBasicInfo";
import SurveysList from "../components/CommunityDetails/Surveys/SurveysList";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "../util/fetch";
import LoadingIndicator from "../components/LoadingIndicator";

function CommunityDetails()
{
    const { id, topic } = useParams();

    const { isPending, error, data: community } = useQuery({
        queryKey: ['community', id],
        queryFn: () => getCommunity(id)
    });

    let communityContent;
    if (topic === undefined)
    {
        communityContent = <CommunityMain community={community} />;
    }
    else if (topic === 'consultations')
    {
        communityContent = <CommunityDiscussionsList />;
    }
    else if (topic === 'surveys')
    {
        communityContent = <SurveysList />
    }
    else
    {
        communityContent = <h1>What are you looking for? Such a content does not exist</h1>
    }

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;
    return (
        <>
            <div className="flex flex-col w-full">
                <CommunityHeader community={community} />
                <div className="flex flex-col px-28 mb-10 relative">
                    <CommunityNavigation />
                    <CommunityBasicInfo community={community}/>
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
import { useParams } from "react-router-dom";
import CommunityHeader from "../components/CommunityDetails/CommunityHeader";
import CommunityMain from "../components/CommunityDetails/CommunityMain";
import CommunityFooter from "../components/CommunityDetails/CommunityFooter";
import CommunityDiscussionsList from "../components/CommunityDetails/Discussions/DiscussionsList";
import CommunityNavigation from "../components/CommunityDetails/CommunityNavigation";
import CommunityBasicInfo from "../components/CommunityDetails/CommunityBasicInfo";

function CommunityDetails()
{
    let { id, topic } = useParams();
    console.log(topic);
    let communityContent;
    if (topic === undefined)
    {
        communityContent = <CommunityMain />;
    }
    else if (topic === 'discussions')
    {
        communityContent = <CommunityDiscussionsList />;
    }
    else
    {
        communityContent = <h1>What are you looking for? Such a content does not exist</h1>
    }


    return (
        <>
            <div className="flex flex-col">
                <CommunityHeader />
                <div className="flex flex-col px-28 mb-10 relative">
                    <CommunityNavigation />
                    <CommunityBasicInfo />
                    {communityContent}
                </div>
                <CommunityFooter />
            </div>
        </>
    )
}

export default CommunityDetails;
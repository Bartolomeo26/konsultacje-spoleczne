import { useParams } from "react-router-dom";
import CommunityHeader from "../components/CommunityDetails/CommunityHeader";
import CommunityMain from "../components/CommunityDetails/CommunityMain";
import CommunityFooter from "../components/CommunityDetails/CommunityFooter";


function CommunityDetails()
{
    const { id } = useParams();
    return (
        <>
            <div className="flex flex-col">
                <CommunityHeader />
                <CommunityMain />
                <CommunityFooter />
            </div>
        </>
    )
}

export default CommunityDetails;
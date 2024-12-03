import CommunityCard from "../CommunityCard";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../LoadingIndicator";
import { getClosestCommunities } from "../../util/fetch";
import { MapPinHouse } from "lucide-react";
function CommunityFooter({ community })
{
    const { isPending, error, data: communities } = useQuery({
        queryKey: ['closestCommunities', community.id],
        queryFn: () => getClosestCommunities({ latitude: community.latitude, longitude: community.longitude, maxDistanceKm: '20' })
    });

    if (isPending) return (<div className="flex flex-col w-full lg:px-28 mb-20">
        <div className="px-6 mb-3">
            <h1 className="text-2xl font-bold flex items-center gap-1">
                <MapPinHouse />
                <span className="text-2xl">Other communities from this region</span>
            </h1>
        </div>
        <div className="flex items-end gap-3 px-6">
            <LoadingIndicator />
        </div>
    </div>);
    if (error) return 'An error has occurred: ' + error.message;

   

    const nearbyCommunities = communities
        ?.filter((item) => item.id !== community.id)
        .slice(0, 5);

    return (
        <div className="flex flex-col w-full lg:px-28 mb-20">
            <div className="px-6 mb-3">
                <h1 className="text-2xl font-bold flex items-center gap-1">
                    <MapPinHouse /> <span className="text-2xl">Other communities from this region</span>
                </h1>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-start items-end gap-2 lg:gap-3 px-3 lg:px-6">
                {!nearbyCommunities.length ? <p className="text-gray-600">No communities found.</p> : <>
                    {nearbyCommunities?.map(foundCommunity => (
                        <CommunityCard key={foundCommunity.id} community={foundCommunity} />
                    ))}
                    {communities?.length > 5 &&
                        <div><p className="font-semibold w-36">And {communities?.length - 5} more...</p></div>}</>}
            </div>
        </div>
    );
}

export default CommunityFooter;

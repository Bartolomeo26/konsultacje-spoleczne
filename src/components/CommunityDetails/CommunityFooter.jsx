import CommunityCard from "../CommunityCard";

import { getCommunitiesList } from "../../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../LoadingIndicator";

function CommunityFooter({ community })
{
    const { isPending, error, data: communities } = useQuery({
        queryKey: ['communities'],
        queryFn: getCommunitiesList
    });

    function isWithinRange(lat1, lon1, lat2, lon2, range = 10)
    {
        const toRadians = (deg) => deg * (Math.PI / 180);
        const R = 6371; // Earth radius in kilometers

        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;

        return distance <= range;
    }

    if (isPending) return (<div className="flex flex-col w-full px-28 mb-20">
        <div className="px-6 mb-3">
            <h1 className="text-2xl font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
                Other communities from this region
            </h1>
        </div>
        <div className="flex items-end gap-3 px-6">
            <LoadingIndicator />
        </div>
    </div>);
    if (error) return 'An error has occurred: ' + error.message;

    // Filter communities within range and limit to 5 results
    const nearbyCommunities = communities?.value
        ?.filter(foundCommunity =>
            isWithinRange(community.latitude, community.longitude, foundCommunity.latitude, foundCommunity.longitude) && foundCommunity.id != community.id)
    const nearbyCommunitiesSliced = nearbyCommunities.slice(0, 5);

    return (
        <div className="flex flex-col w-full px-28 mb-20">
            <div className="px-6 mb-3">
                <h1 className="text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>
                    Other communities from this region
                </h1>
            </div>

            <div className="flex items-end gap-3 px-6">
                {!nearbyCommunities.length ? <p>No communities found.</p> : <>
                    {nearbyCommunitiesSliced?.map(foundCommunity => (
                        <CommunityCard key={foundCommunity.id} community={foundCommunity} />
                    ))}
                    {nearbyCommunities.length > 5 &&
                        <div><p className="font-semibold w-36">And {nearbyCommunities.length - 5} more...</p></div>}</>}
            </div>
        </div>
    );
}

export default CommunityFooter;

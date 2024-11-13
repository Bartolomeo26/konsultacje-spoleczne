import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import { getCommunities, getCommunitiesNumber } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "./LoadingIndicator";

// Ustawienia slidera
const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 8000,
    cssEase: "linear"
};

function SuggestedCommunities()
{
    const { data: totalCommunities, isLoading: isTotalLoading, error: totalError } = useQuery({
        queryKey:
            ['communitiesNumber'],
        queryFn: () => getCommunitiesNumber()
    });

    const { data: communities, isLoading, error } = useQuery({
        queryKey: ['randomCommunities', totalCommunities],
        queryFn: async () =>
        {
            console.log('total', totalCommunities)
            if (totalCommunities)
            {
                const pageSize = 15;
                const totalPages = Math.ceil(totalCommunities.value.length / pageSize);

                const randomPageNumber = Math.floor(Math.random() * totalPages) + 1;

                return getCommunities(randomPageNumber, pageSize);
            }
        },

        enabled: !!totalCommunities,

    });

    if (isLoading || isTotalLoading)
    {
        return (
            <>
                <div className="mt-5 mb-10 text-center" style={{ width: "1300px" }}>
                    <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                    <LoadingIndicator />
                </div>
                <hr style={{ border: "1px solid black", width: "95%" }} />
            </>
        );
    }

    if (totalError || error)
    {
        return <div>An error has occurred: {error?.message || totalError?.message}</div>;
    }

    return (
        <>
            <div className="mt-5 mb-10" style={{ width: "1300px" }}>
                <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                <Slider {...settings}>
                    {communities.value.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </Slider>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    );
}

export default SuggestedCommunities;

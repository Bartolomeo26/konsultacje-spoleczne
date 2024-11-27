import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import { getCommunities } from "../util/fetch";
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
    // Najpierw pobieramy pierwszą stronę, żeby uzyskać dane o paginacji
    const {
        data: randomCommunities,
        isLoading,
        error
    } = useQuery({
        queryKey: ['randomCommunities'],
        queryFn: async () =>
        {
            // Fetch total pages and communities in a single request
            const response = await getCommunities(1, 1);
            const pagination = JSON.parse(response.headers["x-pagination"]);
            const randomPage = Math.floor(Math.random() * Math.floor(pagination.totalPages / 15)) + 1;

            return await getCommunities(randomPage, 15);
        },
        retry: 1,
        staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
        cacheTime: 10 * 60 * 1000  // Keep data in cache for 10 minutes
    });

    if (isLoading)
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

    if (error)
    {
        return (
            <>
                <div className="mt-5 mb-10 text-center" style={{ width: "1300px" }}>
                    <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                    <div>An error has occurred: {error?.message || error?.message}</div>
                </div>
                <hr style={{ border: "1px solid black", width: "95%" }} />
            </>
        );
    }

    return (
        <>
            <div className="mt-5 mb-10 cursor-grab active:cursor-grabbing" style={{ width: "1300px" }}>
                <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                <Slider {...settings}>
                    {randomCommunities?.data.value.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </Slider>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    );
}

export default SuggestedCommunities;

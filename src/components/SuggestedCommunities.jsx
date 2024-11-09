import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import { getCommunitiesList } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "./LoadingIndicator";

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

    const { isPending, error, data: communities } = useQuery({
        queryKey: ['communities'],
        queryFn: getCommunitiesList
    });

    if (isPending) return (<> <div className="mt-5 mb-10 text-center" style={{ width: "1300px" }}>
        <h1 className="text-4xl mb-5 text-center">Different Communities</h1><LoadingIndicator /></div>
        <hr style={{ border: "1px solid black", width: "95%" }} /></>);
    if (error) return 'An error has occurred: ' + error.message;

    // Shuffle and pick the first 15 random communities
    const shuffledCommunities = communities.value.sort(() => Math.random() - 0.5);
    const randomCommunities = shuffledCommunities.slice(0, 15);
    console.log("random", randomCommunities)

    return (
        <>
            <div className="mt-5 mb-10" style={{ width: "1300px" }}>
                <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                <Slider {...settings}>
                    {randomCommunities.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </Slider>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    );
}

export default SuggestedCommunities;
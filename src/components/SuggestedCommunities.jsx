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
    const { data: totalPages, isLoading: isInitialLoading, error: initialError } = useQuery({
        queryKey: ['initialCommunities'],
        queryFn: async () =>
        {
            const response = await getCommunities(1, 1); // Pobieramy pierwszą stronę
            const pagination = JSON.parse(response.headers["x-pagination"]); // Parsujemy dane z nagłówka
            return pagination.totalPages; // Zwracamy tylko totalPages
        }
    });

    // Następnie losujemy stronę na podstawie totalPages z pierwszego zapytania
    const { data: randomCommunities, isLoading: isRandomLoading, error: randomError } = useQuery({
        queryKey: ['randomCommunities', totalPages],
        queryFn: async () =>
        {

            const randomPage = Math.floor(Math.random() * Math.floor(totalPages / 15)) + 1;
            return getCommunities(randomPage, 15); // Pobierz 15 rekordów z losowej strony
        },
        enabled: !!totalPages, // Wykonaj tylko, jeśli mamy dane o liczbie stron
    });

    if (isInitialLoading || isRandomLoading)
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

    if (initialError || randomError)
    {
        return <div>An error has occurred: {randomError?.message || initialError?.message}</div>;
    }

    return (
        <>
            <div className="mt-5 mb-10" style={{ width: "1300px" }}>
                <h1 className="text-4xl mb-5 text-center">Different Communities</h1>
                <Slider {...settings}>
                    {randomCommunities.data.value.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </Slider>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    );
}

export default SuggestedCommunities;

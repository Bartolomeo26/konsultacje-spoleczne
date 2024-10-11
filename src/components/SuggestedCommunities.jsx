import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import bialystok from '../assets/Bialystok.jpeg';
import warsaw from '../assets/Warsaw.jpg';
import gdansk from '../assets/Gdansk.jpg';
const cities = [
    {
        name: "Bialystok",
        description: "Białystok is a vibrant city in northeastern Poland, known for its rich cultural heritage, beautiful parks, and growing role",
        image: bialystok
    },
    {
        name: "Warsaw",
        description: "Warsaw is the vibrant capital of Poland, renowned for its rich history, stunning architecture, and dynamic cultural scene.",
        image: warsaw
    }
    ,
    {
        name: "Gdansk",
        description: "Gdańsk is a port city on the Baltic Sea, known for its beautiful waterfront, medieval architecture, and significant role in Poland's maritime trade.",
        image: gdansk
    }
]

function SuggestedCommunities()
{
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };
    return (
        <>

            <div className="mt-5 mb-10" style={{ width: "1300px" }}>
                <h1 className="text-4xl mb-5 text-center">Suggested Communities</h1>
                <Slider {...settings}>
                    <CommunityCard city={cities[0]} />
                    <CommunityCard city={cities[1]} />
                    <CommunityCard city={cities[2]} />
                    <CommunityCard city={cities[0]} />
                    <CommunityCard city={cities[1]} />
                    <CommunityCard city={cities[2]} />
                </Slider>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />


        </>
    )

}
export default SuggestedCommunities;
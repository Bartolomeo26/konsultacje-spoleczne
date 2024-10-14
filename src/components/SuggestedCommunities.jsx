import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import bialystok from '../assets/Bialystok.jpg';
import warsaw from '../assets/Warsaw.jpg';
import gdansk from '../assets/Gdansk.jpg';
const cities = [
    {
        name: "Piaski",
        description: "Piaski is a lively district in Bialystok, known for its vibrant community and convenient location close to the city center.",
        image: bialystok,
        location: "Białystok"
    },
    {
        name: "Subway",
        description: "Warsaw's subway system is an essential and efficient mode of transportation, connecting various parts of the bustling capital city.",
        image: warsaw,
        location: "Warsaw"
    }
    ,
    {
        name: "Oliwa",
        description: "Oliwa is a picturesque district in Gdansk, famous for its historic architecture and the peaceful Oliwa Park.",
        image: gdansk,
        location: "Gdańsk"
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
import CommunityCard from "./CommunityCard";
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


function CommunitiesList()
{
    return (
        <>
            <div className="flex flex-col px-3">
                <h1>There are <span className="font-bold">1000</span> Communities created so far.</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-2 mb-10 place-items-center">
                    <div>
                        <CommunityCard city={cities[0]} />
                    </div>
                    <div>
                        <CommunityCard city={cities[1]} />
                    </div>
                    <div>
                        <CommunityCard city={cities[2]} />
                    </div>
                    <div>
                        <CommunityCard city={cities[0]} />
                    </div>
                    <div>
                        <CommunityCard city={cities[1]} />
                    </div>
                    <div>
                        <CommunityCard city={cities[2]} />
                    </div>
                </div>
            </div>


        </>)

}

export default CommunitiesList;
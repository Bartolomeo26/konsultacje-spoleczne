import { Link } from "react-router-dom";
import defaultCity from '../assets/defaultCity.png'
import { useState, useEffect } from "react";
import axios from "axios";
function CommunityCard({ community, permission })
{
    const [location, setLocation] = useState({ city: null, country: null });

    useEffect(() =>
    {
        
        const fetchCityFromCoordinates = async (latitude, longitude) =>
        {
            const accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg'; // Zastąp tym swoim tokenem dostępu

            try
            {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`
                );

               
                const city = response.data.features[0]?.context?.find(ctx => ctx.id.includes('place'))?.text;
                const country = response.data.features[0]?.context?.find(ctx => ctx.id.includes('country'))?.short_code;


                if (city && country)
                {
                    return { city, country };
                } else
                {
                    console.log("Nie znaleziono miasta.");
                    return null;
                }
            } catch (error)
            {
                console.error("Błąd podczas uzyskiwania danych o mieście:", error);
                return null;
            }
        };

       
        const getLocation = async () =>
        {
            const { city, country } = await fetchCityFromCoordinates(community.latitude, community.longitude);
            setLocation({ city, country });
        };

        getLocation();
    }, [community.latitude, community.longitude]); 

    return (
        <>

            <div className="w-[14rem] relative bg-white border border-gray-200 rounded-lg shadow " style={{ height: "280px" }}>
                {permission &&
                    <div className="absolute top-0 left-0 bg-blue-700 border-blue-700 p-1 border-b-2 border-e-2 rounded-br-lg rounded-tl-lg">
                        <h1 className="text-xs text-white permission">{permission}</h1>
                    </div>}
                <Link to={`/communities/${community.id}`}>
                    <img className="rounded-t-lg h-32 w-full object-fill" src={community.avatar ? `data:image/jpeg;base64,${community.avatar.data}` : defaultCity} alt="" />
                </Link>
                <div className="p-2">
                    <Link to={`/communities/${community.id}`}>
                        <h5 className=" text-lg font-bold tracking-tight text-gray-900 ">{community.name}</h5>
                    </Link>
                    <div className="h-16">
                        <p className="mb-2 text-xs font-normal text-gray-700 line-clamp-4">
                            {community.description}
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Link
                            to={`/communities/${community.id}`}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            See more
                            <svg
                                className="rtl:rotate-180 w-3 h-3 ms-1.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                        {location.city &&
                            <p className=" text-xs font-normal text-gray-700" style={{ borderColor: "#155e75" }}>{location.city}, <span className="uppercase">{location.country}</span></p>
                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default CommunityCard;
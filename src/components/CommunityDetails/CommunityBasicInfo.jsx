import axios from "axios";
import { useEffect, useState } from "react";

function CommunityBasicInfo({ community })
{
    const [location, setLocation] = useState({ city: null, country: null });

    useEffect(() =>
    {
        // Funkcja asynchroniczna do pobierania miasta i kraju z Mapbox
        const fetchCityFromCoordinates = async (latitude, longitude) =>
        {
            const accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg'; // Zastąp tym swoim tokenem dostępu

            try
            {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`
                );

                // Sprawdzamy, czy odpowiedź zawiera dane
                const city = response.data.features[0]?.context?.find(ctx => ctx.id.includes('place'))?.text;
                const country = response.data.features[0]?.context?.find(ctx => ctx.id.includes('country'))?.text;

                console.log("City:", city);
                console.log("Country:", country);

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

        // Poczekaj na dane z Mapbox i zaktualizuj stan
        const getLocation = async () =>
        {
            const { city, country } = await fetchCityFromCoordinates(community.latitude, community.longitude);
            setLocation({ city, country });
        };

        getLocation();
    }, [community.latitude, community.longitude]); // Zależność od zmiany latitude i longitude w community


    return (
        <div className="absolute top-0 z-10 right-28  bg-slate-200">
            <div className="relative flex flex-col justify-center px-6 py-3 text-center border-s-4 border-b-4 border-e-4 rounded-b-lg" style={{ borderColor: "#155e75" }}>
                <div className="absolute top-0 left-0 p-1 rounded-br-xl border-b-4 border-e-4" style={{ borderColor: "#155e75" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                <h1 className='text-2xl mb-3 font-bold mt-1'><span> Basic Info</span>
                </h1>
                {location &&
                    <p className="text-lg border-b-4 py-1" style={{ borderColor: "#155e75" }}>Location: {location.city}, {location.country}</p>
                }
                <p className="text-lg border-b-4 py-1" style={{ borderColor: "#155e75" }}>Members: {community.members.length}</p>
                <p className="text-lg py-1" style={{ borderColor: "#155e75" }}>Email: {community.administrators[0].email}</p>
            </div>
        </div>
    )
}

export default CommunityBasicInfo;
import { useState, useEffect } from "react";

import axios from "axios";
import { form } from "framer-motion/client";

function CommunityForm({ community, onSubmit, children })
{
    const [error, setError] = useState({ avatar: null, background: null });

    const [enteredData, setEnteredData] = useState({
        name: community?.name,
        description: community?.description,
        avatar: { data: "", description: "", type: 0 },
        background: { data: "", description: "", type: 0 },
        city: "",
        country: "",
        isPublic: community?.isPublic,
    });

    useEffect(() =>
    {
        setEnteredData((prevData) => ({
            ...prevData, name: community?.name, description: community?.description,
            isPublic: community?.isPublic,
        }))
    }, [community])

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
            setEnteredData((prevData) => ({ ...prevData, city, country }))
        };

        getLocation();

    }, [community?.latitude, community?.longitude]); // Zależność od zmiany latitude i longitude w community


    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setEnteredData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) =>
    {
        const file = e.target.files[0];
        if (file)
        {
            if (file.size > 2 * 1024 * 1024)
            { // 2 MB = 2 * 1024 * 1024 bytes
                setError((prevError) => ({ ...prevError, avatar: "Avatar file size must not exceed 2MB." }));
                e.target.value = null; // Clear the file input to prevent uploading
                return; // Prevent further execution
            }
            setError((prevError) => ({ ...prevError, avatar: "" }));
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                setEnteredData((prev) => ({
                    ...prev,
                    avatar: {
                        ...prev.avatar,
                        data: reader.result.split(",")[1],
                        description: file.name,
                        type: 0,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundChange = (e) =>
    {
        const file = e.target.files[0];
        if (file)
        {
            if (file.size > 2 * 1024 * 1024)
            { // 2 MB = 2 * 1024 * 1024 bytes
                setError((prevError) => ({ ...prevError, background: "Background file size must not exceed 2MB." }));
                e.target.value = null; // Clear the file input to prevent uploading
                return; // Prevent further execution
            }
            setError((prevError) => ({ ...prevError, background: "" }));
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                setEnteredData((prev) => ({
                    ...prev,
                    background: {
                        ...prev.background,
                        data: reader.result.split(",")[1],
                        description: file.name,
                        type: 0,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    const fetchCoordinates = async (data) =>
    {
        console.log("przechwyutje", data);
        try
        {
            const accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg';
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.city},${data.country}.json?access_token=${accessToken}`);
            console.log(response);
            const coordinates = response.data.features[0]?.geometry.coordinates;
            console.log(coordinates);
            if (coordinates)
            {
                return coordinates;
            } else
            {
                alert("Unable to find coordinates for the specified location.");
            }
        } catch (error)
        {
            console.error("Error fetching coordinates:", error);
        }
    };

    // Użyj useEffect do reakcji na zmianę w enteredData


    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataToCoordinates = Object.fromEntries(formData);

        const coordinates = await fetchCoordinates(dataToCoordinates);

        formData.append('longitude', coordinates[0])
        formData.append('latitude', coordinates[1])
        formData.append('id', community?.id)
        formData.append('avatar', JSON.stringify(enteredData.avatar))
        formData.append('background', JSON.stringify(enteredData.background))
        formData.delete('city')
        formData.delete('country')
        const data = Object.fromEntries(formData);

        onSubmit({ ...data })

    };
    return (

        <form onSubmit={handleSubmit} className=" mt-5 flex flex-col items-center w-full">
            <div className="w-full flex flex-col items-center p-4">
                <div className="w-full mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                        Name:</label>
                    <div className="relative">
                        <input type="text" id="name" name="name" value={enteredData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                        Description:</label>

                    <textarea name="description" id="description" value={enteredData.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="w-full mb-6">

                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                        City:</label>
                    <div className="relative">
                        <input type="text" id="city" name="city" value={enteredData.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>

                    </div>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                        Country:</label>
                    <div className="relative">
                        <input type="text" id="country" name="country" value={enteredData.country} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                        </svg>

                    </div>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900">
                        Avatar:</label>
                    <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " />
                    {error.avatar && <p className="text-sm text-red-500">{error.avatar}</p>}
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="background" className="block mb-2 text-sm font-medium text-gray-900">
                        Background:</label>
                    <input type="file" id="background" accept="image/*" onChange={handleBackgroundChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                    {error.background && <p className="text-sm text-red-500">{error.background}</p>}
                </div>
                <div className="w-full mb-6 flex gap-1 items-center">

                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        type="checkbox"
                        id="is-public"
                        name="isPublic"
                        checked={enteredData.isPublic}
                        onChange={(e) => setEnteredData((prev) => ({ ...prev, isPublic: e.target.checked }))}
                    />
                    <label htmlFor="is-public" className="  border-gray-300  focus:ring-blue-500 focus:ring-2 "> Public</label>
                </div>
            </div>
            <p className="form-actions">{children}</p>
        </form>

    );
}

export default CommunityForm;
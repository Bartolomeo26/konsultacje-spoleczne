import { useState, useEffect } from "react";
import { Users, MapPin, Globe, ImagePlus, CheckCircle2 } from 'lucide-react';

import axios from "axios";


function CommunityForm({ community, onSubmit, children, title })
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

       
        const fetchCityFromCoordinates = async (latitude, longitude) =>
        {
            const accessToken = 'pk.eyJ1IjoiYmFydG9sb21lbzI2IiwiYSI6ImNscGlodWV3NjBpMjIycW1hOG12bHQzc2kifQ.aI5LhzT-TGLNgcUkuqW-Bg'; // Zastąp tym swoim tokenem dostępu

            try
            {
                if (!latitude || !longitude)
                {
                    return { city: '', country: '' };
                }
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`
                );

                
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

        
        const getLocation = async () =>
        {
            const { city, country } = await fetchCityFromCoordinates(community?.latitude, community?.longitude);

            setEnteredData((prevData) => ({ ...prevData, city, country }))
        };

        getLocation();

    }, [community?.latitude, community?.longitude]); 


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
            {
                setError((prevError) => ({ ...prevError, avatar: "Avatar file size must not exceed 2MB." }));
                e.target.value = null; 
                return; 
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
            { 
                setError((prevError) => ({ ...prevError, background: "Background file size must not exceed 2MB." }));
                e.target.value = null; 
                return; 
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

        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl mx-auto space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{title} Community</h2>
                <p className="text-gray-500 mt-2">Bring people together</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">

                <div className="relative">
                    <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                        Community Name
                    </label>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={enteredData.name}
                            onChange={handleChange}
                            placeholder="Enter community name"
                            className="w-full p-3 rounded-lg outline-none"
                            maxLength={20}
                            required
                        />
                        <Users className="mr-3 text-gray-400" />
                    </div>
                </div>


                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={enteredData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your community"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all min-h-[100px]"
                        required
                    />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-700">
                            City
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={enteredData.city}
                                onChange={handleChange}
                                placeholder="Your city"
                                className="w-full p-3 rounded-lg outline-none"
                                required
                            />
                            <MapPin className="mr-3 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block mb-2 text-sm font-semibold text-gray-700">
                            Country
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={enteredData.country}
                                onChange={handleChange}
                                placeholder="Your country"
                                className="w-full p-3 rounded-lg outline-none"
                                required
                            />
                            <Globe className="mr-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="avatar" className="block mb-2 text-sm font-semibold text-gray-700">
                            Community Logo
                        </label>
                        <div
                            className={`
        relative border-2 border-dashed rounded-lg p-4 text-center transition-all
        ${enteredData.avatar.description
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-300 hover:border-blue-500'}
      `}
                        >
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center">
                                <ImagePlus className={`
          mb-2 
          ${enteredData.avatar.description ? 'text-green-500' : 'text-gray-400'}
        `} size={32} />
                                <p className="text-sm text-gray-500">
                                    {enteredData.avatar.description
                                        ? `Selected: ${enteredData.avatar.description}`
                                        : 'Upload Logo'}
                                </p>
                            </div>
                        </div>
                        {error.avatar && <p className="text-sm text-red-500 mt-1">{error.avatar}</p>}
                    </div>

                    <div>
                        <label htmlFor="background" className="block mb-2 text-sm font-semibold text-gray-700">
                            Cover Image
                        </label>
                        <div
                            className={`
        relative border-2 border-dashed rounded-lg p-4 text-center transition-all
        ${enteredData.background.description
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-300 hover:border-blue-500'}
      `}
                        >
                            <input
                                type="file"
                                id="background"
                                accept="image/*"
                                onChange={handleBackgroundChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center">
                                <ImagePlus className={`
          mb-2 
          ${enteredData.background.description ? 'text-green-500' : 'text-gray-400'}
        `} size={32} />
                                <p className="text-sm text-gray-500">
                                    {enteredData.background.description
                                        ? `Selected: ${enteredData.background.description}`
                                        : 'Upload Cover'}
                                </p>
                            </div>
                        </div>
                        {error.background && <p className="text-sm text-red-500 mt-1">{error.background}</p>}
                    </div>
                </div>

                {/* Public Toggle */}
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        id="is-public"
                        name="isPublic"
                        checked={enteredData.isPublic}
                        onChange={(e) => setEnteredData(prev => ({
                            ...prev,
                            isPublic: e.target.checked
                        }))}
                        className="hidden peer"
                    />
                    <label
                        htmlFor="is-public"
                        className={`
      flex items-center px-4 py-2 rounded-full cursor-pointer transition-all
      ${enteredData.isPublic
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600'}
    `}
                    >
                        <CheckCircle2 className="mr-2" size={20} />
                        Public Community
                    </label>
                </div>
                <div className="flex justify-center">
                    {children}
                </div>
            </form>
        </div>
    );
}

export default CommunityForm;
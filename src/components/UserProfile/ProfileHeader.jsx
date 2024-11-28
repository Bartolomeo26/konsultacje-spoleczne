import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AvatarUpload from './AvatarUpload';
import UpdateAvatarButton from './UpdateAvatarButton';
import { formatToEuropeanDate } from '../../util/formatDate';
import { updateUserProfile } from '../../util/fetch';
import { useAuth } from '../../util/AuthContext';
function ProfileHeader({ user, isLoggedIn })
{

    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalData, setOriginalData] = useState(null); // Store initial data
    const [formData, setFormData] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthDate: user.birthDate,
    });
    const { refetchUser } = useAuth();
    const queryClient = useQueryClient();



    function handleFileSelect(file)
    {
        setSelectedFile(file);
    }

    function handleEditClick()
    {
        setOriginalData(formData); // Save current data as the original
        setIsEditing(true);
    }

    function handleInputChange(event)
    {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // useMutation configuration
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () =>
        {
            queryClient.invalidateQueries(['user', user.id]);
            setIsEditing(false);
            refetchUser();
            console.log("Profile updated successfully!");
        },
        onError: (err) =>
        {
            console.error("Failed to update profile:", err);
        }
    });

    function handleSaveClick()
    {
        console.log('user', user);
        mutate({ formData, user });
    }

    function handleCancelClick()
    {
        setFormData(originalData); // Reset form data to original values
        setIsEditing(false);
    }

    function handleAvatarUpdateSuccess()
    {
        setSelectedFile(null);
    }


    return (
        <div className="flex flex-col w-full bg-slate-200 relative">
            <div className="absolute z-10 top-10 left-6">
                <AvatarUpload
                    onFileSelect={handleFileSelect}
                    avatarData={user.avatar}
                    isLoggedIn={isLoggedIn}
                />
                <UpdateAvatarButton
                    file={selectedFile}
                    user={user}
                    onSuccess={handleAvatarUpdateSuccess}
                />
            </div>
            <div className="p-4 ms-56" style={{ height: "135px" }}>
                {isEditing ? (
                    <div className='w-1/3 flex flex-col gap-y-2 mt-1'>
                        <div className='flex gap-2'>
                            <div className="relative w-1/2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    maxLength={20}
                                    placeholder="Name"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <div className="relative w-1/2">
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    maxLength={30}
                                    placeholder="Surname"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className="relative w-1/2">
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate.slice(0, 10)}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    style={{ height: "41.6px" }}
                                />
                            </div>
                            <div className='flex justify-around gap-2 w-1/2'>
                                <button onClick={handleCancelClick} className=" bg-red-600 text-white rounded w-1/2">
                                    Cancel
                                </button>
                                <button onClick={handleSaveClick} className=" bg-green-600 text-white rounded w-1/2">
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="relative">
                        {isLoggedIn &&
                            <><button
                                onClick={handleEditClick}
                                className="absolute top-1 left-0 p-2 text-white rounded-full"
                                style={{ backgroundColor: "rgba(0, 136, 169, 1)" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button></>}
                        <div className=" ml-12">
                            <h1 className="text-3xl font-bold mb-3">{user.name} {user.surname}</h1>
                            <h1 className="text-xl"><span className='font-semibold'>Birth date:</span> {formatToEuropeanDate(user.birthDate)}</h1>
                            <h1 className="text-xl"><span className='font-semibold'>Email:</span> {user.email}</h1>
                        </div>
                    </div>

                )}
            </div>
            <hr style={{ border: "1px solid", width: "100%", color: "rgba(21,94,117,1)" }} />
        </div >
    );
}

export default ProfileHeader;

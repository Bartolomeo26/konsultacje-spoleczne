import { useState } from 'react';
import { Calendar1Icon, IdCard, Settings, UserIcon } from 'lucide-react';
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
    const [originalData, setOriginalData] = useState(null);
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
        setOriginalData(formData);
        setIsEditing(true);
    }

    function handleInputChange(event)
    {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }


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
        setFormData(originalData);
        setIsEditing(false);
    }

    function handleAvatarUpdateSuccess()
    {
        setSelectedFile(null);
    }


    return (
        <div className="flex flex-col w-full bg-slate-200 relative">
            <div className="flex flex-col items-center justify-center mt-10 lg:mt-0 lg:absolute z-10 top-10 left-6">
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
            <div className="p-4 lg:ms-56" style={{ height: "135px" }}>
                {isEditing ? (
                    <div className="lg:w-1/3 flex flex-col gap-y-2 mt-1 p-1">
                        <div className="grid grid-cols-2 gap-4">

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    maxLength={20}
                                    className="pl-10 w-full bg-slate-50 py-2.5 rounded-lg border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 ease-in-out outline-none text-gray-700"
                                />
                            </div>


                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IdCard className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    maxLength={30}
                                    className="pl-10 w-full bg-slate-50 py-2.5 rounded-lg border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 ease-in-out outline-none text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Birth Date and Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 items-center">
                            {/* Birth Date */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar1Icon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate.slice(0, 10)}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full bg-slate-50 py-2.5 rounded-lg border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 ease-in-out outline-none text-gray-700"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleCancelClick}
                                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveClick}
                                    className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300 ease-in-out shadow-md"
                                >
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
                                className="absolute top-1 left-16 sm:left-36 md:left-56 lg:left-0 p-2 text-white rounded-full"
                                style={{ backgroundColor: "rgba(0, 136, 169, 1)" }}
                            >
                                <Settings size={20} />
                            </button></>}
                        <div className="text-center lg:text-left lg:ml-12">
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

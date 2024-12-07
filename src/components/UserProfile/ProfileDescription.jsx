import { useState } from "react";
import { UserRound, SaveIcon, X, Settings, Info } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDescription } from "../../util/fetch";

function ProfileDescription({ description, isLoggedIn, userId, userName })
{
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(description);
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateUserDescription,
        onSuccess: () =>
        {
            queryClient.invalidateQueries(['user', userId]);
            setIsEditing(false);
            console.log("Description updated successfully!");
        },
        onError: (err) =>
        {
            console.error("Failed to update description:", err);
        }
    });

    function handleSaveClick()
    {
        mutate({ formData: { description: newDescription, id: userId } });
    }

    function handleCancelClick()
    {
        setIsEditing(false);
        setNewDescription(description);
    }

    return (
        <div className="flex flex-col w-full relative">
            {isLoggedIn && !isEditing &&
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute left-2 top-7 md:left-36 lg:left-2 lg:top-14 p-1.5 text-white rounded-full"
                    style={{ backgroundColor: "rgba(0, 136, 169, 1)" }}
                >
                    <Settings size={14} />
                </button>}
            <div className="lg:w-4/5 flex flex-col justify-center items-center lg:items-stretch p-2 py-4">
                <h1 className='text-2xl mb-1.5 font-bold flex items-center gap-1 '>

                    <UserRound size={26} /> <span className="capitalize text-2xl">About {isLoggedIn ? 'me' : userName}</span>
                </h1>
                <div className="flex flex-col items-center lg:items-stretch gap-y-1 lg:px-7 lg:ps-8 w-full lg:w-auto mt-1 lg:mt-0">
                    {isEditing ? (
                        <>
                            <textarea
                                className="w-full md:w-3/4 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                            <div className="flex gap-3 mt-3 w-full md:w-3/4">
                                <button
                                    onClick={handleCancelClick}
                                    disabled={isLoading}
                                    className="flex-1 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600  transition-colors duration-300 ease-in-out shadow-md shadow-gray-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <X size={18} />
                                    <span>Cancel</span>
                                </button>
                                <button
                                    onClick={handleSaveClick}
                                    disabled={isLoading}
                                    className="flex-1 py-2.5  bg-emerald-500  text-white rounded-lg hover:bg-emerald-600  transition-colors duration-300 ease-in-out shadow-md shadow-green-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <SaveIcon size={18} />
                                    <span>Save</span>
                                </button>

                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-100 w-full md:w-2/3 lg:w-auto p-4 rounded-lg border border-gray-150 shadow-sm">
                            {description ? (
                                <p className="text-lg text-gray-800 leading-relaxed">
                                    {description}
                                </p>
                            ) : (
                                <p className="text-base text-gray-500 italic flex items-center gap-2">
                                    <Info className="text-blue-400 opacity-70" size={20} />
                                    {isLoggedIn
                                        ? 'Write something about yourself so that everyone will get to know you better...'
                                        : 'This user has yet to write anything about himself.'}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default ProfileDescription;
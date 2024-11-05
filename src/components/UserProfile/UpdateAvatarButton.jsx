import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function UpdateAvatarButton({ file, user, onSuccess })
{
    async function updateAvatar(file, userId)
    {
        const token = localStorage.getItem('token');
        const base64File = await toBase64(file);

        const patchData = [
            {
                op: "replace",
                path: "/avatar",
                value: {
                    id: 0,
                    data: base64File,
                    description: "User avatar",
                    type: 0
                }
            }
        ];

        try
        {
            const response = await axios.patch(`https://localhost:7150/api/users/${userId}`, patchData, {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Avatar updated successfully:", response);
            return response.data;
        } catch (error)
        {
            console.error("Failed to update avatar:", error);
            if (error.response)
            {
                console.error("Error response:", error.response.data);
                console.error("Status code:", error.response.status);
            }
            throw error;
        }
    }

    function toBase64(file)
    {
        return new Promise((resolve, reject) =>
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    }

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: () => user?.id ? updateAvatar(file, user.id) : Promise.reject(new Error("User ID is undefined")),
        onSuccess,
        onError: (error) => console.error("Mutation failed:", error.message)
    });

    return (
        <div className='text-center'>
            {file && (
                <button
                    onClick={() => mutate()}
                    disabled={isPending}
                    className="mt-2 p-2 bg-green-700 text-md text-white rounded"
                >
                    {isPending ? 'Updating...' : 'Confirm Avatar'}
                </button>
            )}
            {isError && <p className="text-red-500">Error: {error.message}</p>}
        </div>
    );
}

export default UpdateAvatarButton;

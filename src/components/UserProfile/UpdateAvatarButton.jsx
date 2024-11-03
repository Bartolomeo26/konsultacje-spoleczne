import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function updateAvatar(file, userId)
{
    const formData = new FormData();
    formData.append('avatar', file);
    console.log(formData);
    return axios.put(`https://localhost:7150/api/users/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}

function UpdateAvatarButton({ file, userId, onSuccess })
{
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: () => updateAvatar(file, userId),
        onSuccess,
    });

    return (
        <>
            {file && (
                <button
                    onClick={() => mutate()}
                    disabled={isLoading}
                    className="mt-3 p-2 bg-blue-500 text-white rounded"
                >
                    {isLoading ? 'Updating...' : 'Confirm Avatar'}
                </button>
            )}
            {isError && <p className="text-red-500">Error: {error.message}</p>}
        </>
    );
}

export default UpdateAvatarButton;

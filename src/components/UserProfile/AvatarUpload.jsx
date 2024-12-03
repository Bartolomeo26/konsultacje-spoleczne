import { useState, useEffect } from 'react';
import defaultAvatar from '../../assets/defaultProfile.jpg';



function AvatarUpload({ onFileSelect, avatarData, isLoggedIn })
{
    const [preview, setPreview] = useState(null);


    useEffect(() =>
    {
        if (avatarData && avatarData.data)
        {
            setPreview(`data:image/jpeg;base64,${avatarData.data}`);
        } else
        {
            setPreview(defaultAvatar);
        }
    }, [avatarData]);


    function handleFileChange(event)
    {
        const file = event.target.files[0];
        if (file)
        {
            setPreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    }

    return (
        <div
            className="relative w-48 h-48 cursor-pointer group"
            onClick={() => document.getElementById('avatarFileInput').click()}
        >
            <img
                src={preview}
                alt="Profile Avatar"
                className="w-full h-full rounded-full border-2 object-cover"
                style={{ borderColor: "rgba(21,94,117,1)" }}
            />
            {isLoggedIn &&
                <><input
                    type="file"
                    id="avatarFileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                    <div className="absolute inset-0 text-white bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>

                    </div></>}
        </div>
    );
}

export default AvatarUpload;

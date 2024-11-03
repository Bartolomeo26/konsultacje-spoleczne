import { useState } from 'react';
import defaultAvatar from '../../assets/defaultProfile.jpg';

function AvatarUpload({ onFileSelect })
{
    const [preview, setPreview] = useState(null);

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
                src={preview || defaultAvatar}
                alt="Profile Avatar"
                className="w-full h-full rounded-full border-2"
                style={{ borderColor: "rgba(21,94,117,1)" }}
            />
            <input
                type="file"
                id="avatarFileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white">Click to change</span>
            </div>
        </div>
    );
}

export default AvatarUpload;

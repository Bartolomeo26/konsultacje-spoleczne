import { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import UpdateAvatarButton from './UpdateAvatarButton';

function ProfileHeader({ user })
{
    const [selectedFile, setSelectedFile] = useState(null);

    function formatToEuropeanDate(dateString)
    {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const today = new Date();
        let age = today.getFullYear() - year;
        if (
            today.getMonth() < date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
        )
        {
            age--;
        }

        return `${day}-${month}-${year} (${age} years old)`;
    }

    function handleFileSelect(file)
    {
        setSelectedFile(file);
    }

    function handleAvatarUpdateSuccess()
    {
        alert('Avatar updated successfully!');
        setSelectedFile(null);  // Reset file after successful update
    }

    return (
        <div className="flex flex-col w-full bg-slate-200 relative">
            <div className="absolute top-10 left-5">
                <AvatarUpload onFileSelect={handleFileSelect} />
                <UpdateAvatarButton
                    file={selectedFile}
                    userId={user.id}
                    onSuccess={handleAvatarUpdateSuccess}
                />
            </div>
            <div className="p-5 ms-56">
                <h1 className="text-3xl font-bold mb-3">{user.name} {user.surname}</h1>
                <h1 className="text-xl"><span className='font-semibold'>Birth date:</span> {formatToEuropeanDate(user.birthDate)}</h1>
                <h1 className="text-xl"><span className='font-semibold'>Email:</span> {user.email}</h1>
            </div>

            <hr style={{ border: "1px solid", width: "100%", color: "rgba(21,94,117,1)" }} />
        </div>
    );
}

export default ProfileHeader;

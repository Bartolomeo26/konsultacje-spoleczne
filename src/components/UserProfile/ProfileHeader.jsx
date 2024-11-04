import { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import UpdateAvatarButton from './UpdateAvatarButton';

function ProfileHeader({ user })
{
    const [selectedFile, setSelectedFile] = useState(null);

    // Jeśli `user` jest `undefined`, nie próbuj renderować komponentu
    if (!user)
    {
        return <div>Loading...</div>;
    }

    function handleFileSelect(file)
    {
        setSelectedFile(file);
    }

    function handleAvatarUpdateSuccess()
    {
        setSelectedFile(null); // Zresetuj plik po pomyślnej aktualizacji
    }

    return (
        <div className="flex flex-col w-full bg-slate-200 relative">
            <div className="absolute top-10 left-5">
                <AvatarUpload
                    onFileSelect={handleFileSelect}
                    avatarData={user.avatar}
                />
                <UpdateAvatarButton
                    file={selectedFile}
                    user={user}  // Zmiana - przekazujemy obiekt `user` w całości
                    onSuccess={handleAvatarUpdateSuccess}
                />
            </div>
            <div className="p-5 ms-56">
                <h1 className="text-3xl font-bold mb-3">{user.name} {user.surname}</h1>
                <h1 className="text-xl"><span className='font-semibold'>Birth date:</span> {user.birthDate}</h1>
                <h1 className="text-xl"><span className='font-semibold'>Email:</span> {user.email}</h1>
            </div>

            <hr style={{ border: "1px solid", width: "100%", color: "rgba(21,94,117,1)" }} />
        </div>
    );
}

export default ProfileHeader;

import defaultProfile from '../../assets/defaultProfile.jpg'

function ProfileHeader({ user })
{
    function formatToEuropeanDate(dateString)
    {
        console.log(dateString);
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        // Calculate age
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

    return (<>

        <div className="flex flex-col w-full mt-2  relative z-10">
            <div className='absolute top-10 left-5 right-5'>
                {user.avatar ? <img src="" alt="Profile picture" /> : <img src={defaultProfile} alt="Default profile picture" className="rounded-full" />}
            </div>
            <div className="p-5 ms-56">
                <h1 className='text-2xl font-bold mb-3'>{user.name} {user.surname}</h1>
                <h1 className='text-xl'>Birth date: {formatToEuropeanDate(user.birthDate)}</h1>
                <h1 className='text-xl'>Email: {user.email}</h1>
            </div>
            <hr style={{ border: "1px solid", width: "100%", color: "rgba(21,94,117,1)" }} />
        </div>

    </>)

}

export default ProfileHeader;
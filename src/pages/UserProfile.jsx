import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../util/fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileNavigation from "../components/UserProfile/ProfileNavigation";
import { useState } from "react";
import ProfileSettings from "../components/UserProfile/ProfileSettings";


function UserProfile()
{
    const [contentType, setContentType] = useState('about');
    const { id } = useParams();

    const { isPending, error, data: user } = useQuery({
        queryKey: ['user', id], // include id in the query key to refetch for different ids
        queryFn: () => getUser(id)
    });

    function handleContentChange(type)
    {
        setContentType(type);
    }

    let content = <h1>What are you looking for?</h1>
    if (contentType === 'about')
    {
        content = <h1>About</h1>
    }
    else if (contentType === 'communities')
    {
        content = <h1>Your Communities</h1>
    }
    else if (contentType === 'consultations')
    {
        content = <h1>Consultations</h1>
    }
    else if (contentType === 'settings')
    {
        content = <ProfileSettings user={user} />
    }

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className="w-full">
            <ProfileHeader user={user} />
            <div className="flex flex-col px-28 mb-10 relative">
                <ProfileNavigation handleContentChange={handleContentChange} />
                <div className="px-44 mt-12">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../util/fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileNavigation from "../components/UserProfile/ProfileNavigation";
import { useState } from "react";
import ProfileSettings from "../components/UserProfile/ProfileSettings";
import ProfileCommunities from "../components/UserProfile/ProfileCommunities";
import { useAuth } from "../util/AuthContext";
import { UserRound } from "lucide-react";
function UserProfile()
{
    const [contentType, setContentType] = useState('about');
    const { id } = useParams();
    const { loggedUser = null } = useAuth();

    const { isPending, error, data: user } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id)
    });
    const isLoggedIn = loggedUser?.id === user?.id;
    function handleContentChange(type)
    {
        setContentType(type);
    }

    let content = <h1>What are you looking for?</h1>
    if (contentType === 'about')
    {
        content = <div className="flex flex-col w-full">
            <div className="lg:w-4/5 flex flex-col justify-center p-2 py-4">
                <h1 className='text-2xl mb-3 font-bold flex items-center gap-1'><UserRound size={26} /> <span className="capitalize">About {isLoggedIn ? 'me' : user?.name}</span></h1>
                <div className="flex flex-col gap-y-1 lg:px-7">
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vitae perspiciatis nemo numquam ipsa architecto dolores, rerum molestiae illo. Enim quasi ullam ratione, autem velit eius temporibus incidunt at architecto?
                        Tempore beatae explicabo, minima doloribus, quisquam dolorem vero cupiditate nostrum molestias sed iusto commodi, laudantium perferendis sequi culpa possimus aliquam aliquid maiores rem id dolor nobis facilis asperiores. Cupiditate, adipisci.
                    </p>
                </div>
            </div>

        </div>
    }
    else if (contentType === 'communities')
    {
        content = <ProfileCommunities user={user} isLoggedIn={isLoggedIn} />
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
            <ProfileHeader user={user} isLoggedIn={isLoggedIn} />
            <div className="flex flex-col px-3.5 lg:px-28 mb-10 relative">
                <ProfileNavigation handleContentChange={handleContentChange} isLoggedIn={isLoggedIn} />
                <div className="lg:ps-44 lg:pe-28 mt-2 lg:mt-12">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
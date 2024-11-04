import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../util/fetch";
import LoadingIndicator from "../components/LoadingIndicator";
import ProfileHeader from "../components/UserProfile/ProfileHeader";

function UserProfile()
{
    const { id } = useParams();

    const { isPending, error, data: user } = useQuery({
        queryKey: ['user', id], // include id in the query key to refetch for different ids
        queryFn: () => getUser(id)
    });

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className="w-full">
            <ProfileHeader user={user} />
        </div>
    );
}

export default UserProfile;
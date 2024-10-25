import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
function UserProfile()
{
    const { id } = useParams();

    const { isPending, error, data: user } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () =>
            await axios.get('https://localhost:7150/api/users/' + id, {
                headers: {
                    'accept': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            })
                .then(response =>
                {

                    return response.data.value;


                }),
    })


    if (error) return 'An error has occurred: ' + error.message
    return (
        <>
            <div>
                <h1>User</h1>
                (user && {<h1>{user.name}</h1>})
            </div>
        </>
    );
}

export default UserProfile;
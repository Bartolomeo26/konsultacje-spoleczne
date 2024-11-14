import { useQuery } from "@tanstack/react-query";
import { getCommunitiesList } from "../../util/fetch";

function ProfileCommunities({ user })
{

    const { isPending, error, data } = useQuery({
        queryKey: ["communities"],
        queryFn: () => getCommunitiesList(),
        staleTime: 5 * 60 * 1000, // Dane będą uznawane za świeże przez 5 minut
        cacheTime: 10 * 60 * 1000,
        retry: 0
    });
    return (<div className="flex flex-col w-full">
        <div className="w-4/5 flex flex-col justify-center p-2 py-4">
            <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg> Your Communities</h1>
            <div className="flex flex-col gap-y-1 px-4 ">


            </div>
        </div>

    </div>)
}
export default ProfileCommunities;
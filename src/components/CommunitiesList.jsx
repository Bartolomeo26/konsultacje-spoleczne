import CommunityCard from "./CommunityCard";
import { getCommunitiesList } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "./LoadingIndicator";


function CommunitiesList()
{
    const { isPending, error, data: communities } = useQuery({
        queryKey: ['communities'],
        queryFn: getCommunitiesList
    });

    if (isPending) return <LoadingIndicator />;
    if (error) return 'An error has occurred: ' + error.message;
    return (
        <>
            <div className="flex flex-col px-3">
                <h1>There are <span className="font-bold">{communities?.value?.length || 0}</span> Communities created so far.</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-2 mb-10 place-items-center">
                    {communities?.value?.map((community, index) => (
                        <div key={index}>
                            <CommunityCard community={community} />
                        </div>
                    ))}
                </div>
            </div>


        </>)

}

export default CommunitiesList;
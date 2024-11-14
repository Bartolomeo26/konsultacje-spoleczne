import { useMutation } from "@tanstack/react-query";
import { acceptJoinToCommunity, rejectJoinToCommunity } from "../../../util/fetch";

function JoinRequestsList({ joinRequests, communityId })
{

    const { mutate: mutateAccept, isLoading: loadingAccept, isError: isErrorAccept, error: errorAccept } = useMutation({
        mutationFn: acceptJoinToCommunity,
        onSuccess: () =>
        {
            alert("Accepting success!");

        },
        onError: (err) =>
        {
            alert(`Błąd: ${err.message}`);
        },
    });

    const { mutate: mutateReject, isLoading: loadingReject, isError: isErrorReject, error: errorReject } = useMutation({
        mutationFn: rejectJoinToCommunity,
        onSuccess: () =>
        {
            alert("Rejecting success!");

        },
        onError: (err) =>
        {
            alert(`Błąd: ${err.message}`);
        },
    });

    function handleAcceptJoinRequest(joinRequestId)
    {
        const dataAccept = { communityId, joinRequestId };
        console.log('no', dataAccept);
        mutateAccept({ ...dataAccept })
    }

    function handleRejectJoinRequest(joinRequestId)
    {
        const dataReject = { communityId, joinRequestId };
        console.log('no', dataReject);
        mutateReject({ ...dataReject })
    }

    return (
        <>
            <div className="flex flex-col w-3/4">
                <div className="flex">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                        <div className="flex justify-between">
                            <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                            </svg> Join Requests</h1>

                        </div>
                        <div className="flex flex-col">
                            {joinRequests?.map((joinRequest, index) => (
                                <div key={index} className="mb-2">
                                    <h1>{joinRequest?.user?.name} {joinRequest?.user?.surname}</h1>
                                    <div className="flex gap-2">
                                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4  font-medium rounded-lg text-base px-5 py-2.5" onClick={() => handleAcceptJoinRequest(joinRequest?.id)}>Accept</button>
                                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-3 py-2.5  " onClick={() => handleRejectJoinRequest(joinRequest?.id)}>Reject</button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default JoinRequestsList;
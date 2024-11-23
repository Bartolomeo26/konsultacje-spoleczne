import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { acceptJoinToCommunity, rejectJoinToCommunity } from "../../../util/fetch";
import JoinRequestCard from "./JoinRequestCard";
import { useQueryClient } from "@tanstack/react-query";

function JoinRequestsList({ joinRequests, communityId })
{
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("pending");

    const { mutate: mutateAccept } = useMutation({
        mutationFn: acceptJoinToCommunity,
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ['community'] })
            alert("Accepting success!");
        },
        onError: (err) =>
        {
            alert(`Error: ${err.message}`);
        },
    });

    const { mutate: mutateReject } = useMutation({
        mutationFn: rejectJoinToCommunity,
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ['community'] })
            alert("Rejecting success!");
        },
        onError: (err) =>
        {
            alert(`Error: ${err.message}`);
        },
    });

    function handleAcceptJoinRequest(joinRequestId)
    {
        const dataAccept = { communityId, joinRequestId };
        mutateAccept({ ...dataAccept });
    }

    function handleRejectJoinRequest(joinRequestId)
    {
        const dataReject = { communityId, joinRequestId };
        mutateReject({ ...dataReject });
    }

    // Filtrowanie zgłoszeń
    const filteredRequests = joinRequests.filter((request) =>
    {
        if (filter === "pending") return request.status === 0;
        if (filter === "handled") return request.status === 1 || request.status === 2;
        return true;
    });

    return (
        <div className="flex flex-col lg:w-3/4">
            <div className="flex">
                <div className="lg:w-4/5 flex flex-col justify-center p-2 lg:p-6 mt-16 lg:mt-10">
                    <div className="flex justify-between items-center gap-2 mb-4">
                        <h1 className="text-2xl font-bold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 inline-block mb-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                                />
                            </svg>{" "}
                            Join Requests
                        </h1>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setFilter("pending")}
                                className={`px-4 py-2 rounded-md font-semibold ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter("handled")}
                                className={`px-4 py-2 rounded-md font-semibold ${filter === "handled" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Handled
                            </button>
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-md font-semibold ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                All
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((joinRequest) => (
                                <JoinRequestCard
                                    key={joinRequest.id}
                                    request={joinRequest}
                                    onAccept={handleAcceptJoinRequest}
                                    onReject={handleRejectJoinRequest}

                                />
                            ))
                        ) : (
                            <p className="text-gray-600">No requests found for the selected filter.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinRequestsList;

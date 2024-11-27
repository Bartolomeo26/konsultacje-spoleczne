import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { acceptJoinToCommunity, rejectJoinToCommunity } from "../../../util/fetch";
import JoinRequestCard from "./JoinRequestCard";
import { useQueryClient } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import { usePopup } from "../../../util/PopupContext";

function JoinRequestsList({ joinRequests, communityId })
{
    const { triggerPopup } = usePopup();
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("pending");

    const { mutate: mutateAccept } = useMutation({
        mutationFn: acceptJoinToCommunity,
        onSuccess: () =>
        {
            triggerPopup('Request accepted successfully!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            queryClient.invalidateQueries({ queryKey: ['community'] })

        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
        },
    });

    const { mutate: mutateReject } = useMutation({
        mutationFn: rejectJoinToCommunity,
        onSuccess: () =>
        {
            triggerPopup('Request rejected successfully!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            queryClient.invalidateQueries({ queryKey: ['community'] })

        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });

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
                        <h1 className="text-2xl font-bold flex items-center gap-1">
                            <Inbox />
                            <span className="text-2xl">Join Requests</span>
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

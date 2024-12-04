/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { joinToCommunity } from "../../util/fetch";
import { useAuth } from "../../util/AuthContext";
import { useState } from "react";
import defaultCity from '../../assets/defaultCity.png'
import DeleteCommunity from "./DeleteCommunity";
import { usePopup } from "../../util/PopupContext";
import { useNavigate } from "react-router-dom";

function CommunityHeader({ community, permissions })
{

    const { triggerPopup = null } = usePopup();
    const { loggedUser = null } = useAuth();
    const [hasRequested, setHasRequested] = useState(() =>
        community.joinRequests.find(request => request.userId === loggedUser?.id && request.status === 0)
    );

    const [hasRejected, setHasRejected] = useState(() =>
        community.joinRequests.find(request => request.userId === loggedUser?.id && request.status === 2)
    );

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: joinToCommunity,
        onSuccess: () =>
        {
            triggerPopup('Request sent successfuly!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            setHasRequested(true);
        },
        onError: (err) =>
        {
            triggerPopup('Error: ' + err.message, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
        },
    });



    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-col lg:flex-row w-full border-b-8 border-[#155e75]">

                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-6 relative min-h-[300px] lg:min-h-[430px]">

                        <div className="absolute top-0 border-b-4 border-s-4 border-e-4 p-3 lg:p-4 rounded-b-lg bg-slate-200 border-[#155e75]">
                            <h1 className="text-lg lg:text-xl text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 lg:size-8 inline-block mb-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                {community.isPublic ? "Public Community" : "Private Community"}
                            </h1>
                        </div>
                        <div className="absolute left-5 top-5">
                            <Link to={`/communities`}>
                                <button className="mb-3 p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </button>
                            </Link>
                        </div>


                        <h1 className="text-6xl md:text-6xl lg:text-8xl text-center mb-14 lg:mb-0">
                            {community.name}
                        </h1>


                        {(!permissions.isAdmin && !permissions.isMember && loggedUser) && (
                            <div className="absolute bottom-20">
                                {!hasRequested && !hasRejected ? (
                                    <button
                                        type="button"
                                        onClick={() => mutate({ id: community.id })}
                                        disabled={isLoading}
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm lg:text-base px-4 lg:px-5 py-2 lg:py-2.5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-4 lg:size-5 inline-block"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                        </svg>{" "}
                                        {isLoading ? "Loading..." : "Request to join community"}
                                    </button>
                                ) : hasRequested ? (
                                    <button
                                        disabled
                                        className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm lg:text-base px-4 lg:px-5 py-2 lg:py-2.5"
                                    >
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 lg:size-5 inline-block">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span>Request sent</span>
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="focus:outline-none text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm lg:text-base px-4 lg:px-5 py-2 lg:py-2.5"
                                    >
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 lg:size-5 inline-block">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span>Request rejected</span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        )}


                        {permissions.isAdmin && (
                            <div className="absolute bottom-5 w-full">
                                <div className="flex items-top sm:flex-row justify-between gap-2 px-4 lg:px-8">
                                    <Link to={`/communities/${community.id}/edit`}>
                                        <button type="button" className="min-w-[200px] sm:w-auto focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base  px-3 py-2.5">
                                            <div className="flex items-center justify-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                <span>Edit Community</span>
                                            </div>
                                        </button>
                                    </Link>
                                    <DeleteCommunity community={community} />
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] lg:h-[430px]">
                        <img
                            src={community.background ? `data:image/jpeg;base64,${community.background.data}` : defaultCity}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommunityHeader;
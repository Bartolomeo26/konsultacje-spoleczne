import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../util/fetch";
import LoadingIndicator from "./LoadingIndicator";
import CommunityCard from "./CommunityCard";
import generatePagination from "../util/pagination";
import Pagination from "./Pagination";

const pageSize = 20;

function CommunitiesList({ searchTerm, sortField, sortOrder })
{

    const [pageNumber, setPageNumber] = useState(() =>
    {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("page")) || 1;
    });


    const {
        isPending: isLoadingCommunities,
        error: communitiesError,
        data: response,
    } = useQuery({
        queryKey: ["communities", pageNumber, searchTerm, sortField, sortOrder],
        queryFn: () => getCommunities(pageNumber, pageSize, searchTerm, sortField, sortOrder),
        retry: 0,
    });

    useEffect(() =>
    {

        const params = new URLSearchParams(window.location.search);
        params.set("page", pageNumber);
        window.history.replaceState(null, "", `?${params.toString()}`);
    }, [pageNumber]);

    if (isLoadingCommunities) return <LoadingIndicator />;

    const communities = response?.data?.value || [];
    const totalCount = response?.headers?.["x-pagination"]
        ? JSON.parse(response.headers["x-pagination"]).totalCount
        : 0;
    const totalPages = response?.headers?.["x-pagination"]
        ? JSON.parse(response.headers["x-pagination"]).totalPages
        : 1;


    const paginationButtons = generatePagination(totalPages, pageNumber);

    if (communitiesError) return (
        <div className="flex flex-col px-3 mb-10">
            <div className="text-center">
                <div>No community found.</div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col px-3 mb-10">
            {totalCount ? (
                <h1>
                    There are <span className="font-bold">{totalCount}</span> Communities created so far.
                </h1>
            ) : (
                <h1>
                    There are <span className="font-bold">...</span> Communities created so far.
                </h1>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-2 mb-5 place-items-center">
                {communities.map((community, index) => (
                    <div key={index}>
                        <CommunityCard community={community} />
                    </div>
                ))}
            </div>
            {totalCount > 0 && (
                <div className="flex items-center justify-between px-4 sm:px-6">
                    <div className=" flex flex-1 items-center justify-between">
                        <Pagination paginationButtons={paginationButtons} pageSize={pageSize} pageNumber={pageNumber} totalCount={totalCount} setPageNumber={setPageNumber} totalPages={totalPages} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommunitiesList;

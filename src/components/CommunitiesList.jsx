import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../util/fetch";
import LoadingIndicator from "./LoadingIndicator";
import CommunityCard from "./CommunityCard";

const pageSize = 20;

function CommunitiesList({ searchTerm, sortField, sortOrder })
{

    const [pageNumber, setPageNumber] = useState(() =>
    {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("page")) || 1; // Pobierz stronę z query string lub domyślnie 1
    });

    // Fetch communities for the current page
    const {
        isPending: isLoadingCommunities,
        error: communitiesError,
        data: response,
    } = useQuery({
        queryKey: ["communities", pageNumber, searchTerm, sortField, sortOrder],
        queryFn: () => getCommunities(pageNumber, pageSize, searchTerm, sortField, sortOrder),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 0,
    });

    useEffect(() =>
    {
        // Aktualizacja query string w URL
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

    const generatePagination = (totalPages, currentPage) =>
    {
        const visiblePages = 1; // Liczba stron przed i po aktualnej stronie
        const pagination = [];

        pagination.push(1); // Pierwsza strona zawsze widoczna

        if (currentPage > visiblePages + 2)
        {
            pagination.push("..."); // Wielokropki po pierwszej stronie
        }

        // Strony wokół aktualnej
        for (let i = Math.max(2, currentPage - visiblePages); i <= Math.min(totalPages - 1, currentPage + visiblePages); i++)
        {
            pagination.push(i);
        }

        if (currentPage < totalPages - visiblePages - 1)
        {
            pagination.push("..."); // Wielokropki przed ostatnią stroną
        }

        if (totalPages > 1)
        {
            pagination.push(totalPages); // Ostatnia strona
        }

        return pagination;
    };

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-2 mb-10 place-items-center">
                {communities.map((community, index) => (
                    <div key={index}>
                        <CommunityCard community={community} />
                    </div>
                ))}
            </div>
            {totalCount > 0 && (
                <div className="flex items-center justify-between px-4 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(pageNumber - 1) * pageSize + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(pageNumber * pageSize, totalCount)}
                                </span>{" "}
                                of <span className="font-medium">{totalCount}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                                    disabled={pageNumber === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {paginationButtons.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof item === "number" && setPageNumber(item)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${item === pageNumber
                                            ? "bg-indigo-600 text-white"
                                            : typeof item === "number"
                                                ? "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                : "text-gray-700"
                                            }`}
                                        disabled={item === "..."}
                                    >
                                        {item}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={pageNumber === totalPages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommunitiesList;

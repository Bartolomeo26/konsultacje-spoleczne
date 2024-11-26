import CommentCard from "./CommentCard";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../../util/fetch";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Filters from "../../../Filters";
import LoadingIndicator from "../../../LoadingIndicator";

const pageSize = 20;

const SORTING_OPTIONS = [
    { value: "id_desc", label: "Most Recent", field: "Id", order: "desc" },
    { value: "id_asc", label: "Oldest", field: "Id", order: "asc" }
];

function CommentsList({ reply })
{

    const [sortConfig, setSortConfig] = useState({
        field: "Id",
        order: "desc"
    });
    const [pageNumber, setPageNumber] = useState(() =>
    {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("page")) || 1; // Pobierz stronę z query string lub domyślnie 1
    });
    const { consultationId } = useParams();
    const {
        isPending: isLoadingComments,
        error: commentsError,
        data: response,
    } = useQuery({
        queryKey: ["comments", consultationId, pageNumber, sortConfig.field, sortConfig.order],
        queryFn: () => getComments(pageNumber, pageSize, sortConfig.field, sortConfig.order, consultationId),
        retry: 0,
    });

    const comments = response?.data?.value || [];

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

    return (<div className="space-y-2 max-w-3xl mb-10">
        <div className="flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-1"><span className="text-xl lg:text-2xl">{totalCount}</span> Answers</h2>
            <Filters
                onSort={setSortConfig} SORTING_OPTIONS={SORTING_OPTIONS} />
        </div>
        <div className="space-y-4">
            <div className="flex flex-col gap-5 mt-2">
                {isLoadingComments ? (
                    <LoadingIndicator />
                ) : commentsError ? (
                    <div className="flex flex-col px-3 mb-10">
                        <div className="text-center">
                            <div>No comment found.</div>
                        </div>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} reply={reply} comment={comment} />
                    ))
                )}
            </div>
            {totalCount > 0 && (
                <div className="flex items-center justify-between px-1 sm:px-2 mt-5">
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
    </div>)

}

export default CommentsList;

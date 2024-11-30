import { Link } from "react-router-dom";
import ConsultationCard from "./ConsultationCard";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../../util/fetch";
import { useState } from "react";
import Filters from "../../Filters";
import LoadingIndicator from "../../LoadingIndicator";
import { useParams } from "react-router-dom";
const pageSize = 10;
const SORTING_OPTIONS = [
    { value: "id_desc", label: "Most Recent", field: "Id", order: "desc" },
    { value: "id_asc", label: "Oldest", field: "Id", order: "asc" },
    { value: "title_asc", label: "Title (A-Z)", field: "Title", order: "asc" },
    { value: "title_desc", label: "Title (Z-A)", field: "Title", order: "desc" }
];


function ConsultationsList({ permissions })
{
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        field: "Id",
        order: "desc"
    });
    const [pageNumber, setPageNumber] = useState(() =>
    {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("page")) || 1; // Pobierz stronę z query string lub domyślnie 1
    });

    const {
        isPending: isLoadingConsultations,
        error: consultationsError,
        data: response,
    } = useQuery({
        queryKey: ["issues", id, pageNumber, searchTerm, sortConfig.field, sortConfig.order],
        queryFn: () => getIssues(pageNumber, pageSize, searchTerm, sortConfig.field, sortConfig.order, id),
        retry: 0,
    });


    const consultations = response?.data?.value || [];
    console.log("NO", consultations)
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



    return (
        <>
            <div className="flex flex-col w-3/4 ">
                <div className="flex">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className='text-2xl mb-1 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg> Consultations</h1>
                            <div className="flex gap-2 items-center">
                                <Filters
                                    searchPlaceholder={'Transport problems'}
                                    onSearch={setSearchTerm}
                                    onSort={setSortConfig} SORTING_OPTIONS={SORTING_OPTIONS} />
                                {permissions.isAdmin &&
                                    <Link to='new'>
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 rounded-lg px-2.5 py-2.5"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 font-bold">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button></Link>}
                            </div>
                        </div>
                        <div>
                            {isLoadingConsultations ? (
                                <LoadingIndicator />
                            ) : consultationsError ? (
                                <div className="flex flex-col px-3 mb-10 mt-3">
                                    <div className="text-center">
                                        <div>No consultation found.</div>
                                    </div>
                                </div>
                            ) : (
                                consultations.map((consultation) => (
                                    <ConsultationCard key={consultation.id} consultation={consultation} permissions={permissions} />
                                ))
                            )}

                        </div>
                        {totalCount > 0 && (
                            <div className="flex items-center justify-between px-4 sm:px-6 mt-5">
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
                                                        ? "bg-cyan-800 text-white"
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

                </div>

            </div>
        </>
    )
}

export default ConsultationsList;
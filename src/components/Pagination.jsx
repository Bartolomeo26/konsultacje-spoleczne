function Pagination({ paginationButtons, pageNumber, pageSize, totalCount, setPageNumber, totalPages })
{

    return (<>
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
    </>);
}

export default Pagination;
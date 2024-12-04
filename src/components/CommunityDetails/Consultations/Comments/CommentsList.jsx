import CommentCard from "./CommentCard";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../../util/fetch";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Filters from "../../../Filters";
import LoadingIndicator from "../../../LoadingIndicator";
import generatePagination from "../../../../util/pagination";
import Pagination from "../../../Pagination";

const pageSize = 10;

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
        return Number(params.get("page")) || 1;
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



    const paginationButtons = generatePagination(totalPages, pageNumber);

    return (<div className="space-y-2 max-w-3xl mb-10 mt-3">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-1"><span className="text-xl lg:text-2xl">{totalCount}</span> Answers</h2>
            <div className="w-2/5 lg:w-1/5">
                <Filters
                    onSort={setSortConfig} SORTING_OPTIONS={SORTING_OPTIONS} />
            </div>
        </div>
        <div className="space-y-4">
            <div className="flex flex-col gap-5 mt-2">
                {isLoadingComments ? (
                    <div className="flex justify-center">
                        <LoadingIndicator />
                    </div>
                ) : commentsError ? (
                    <div className="flex flex-col px-3 mb-10">
                        <div className="text-center">
                            <div>No comment found.</div>
                        </div>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment?.id} reply={reply} comment={comment} />
                    ))
                )}
            </div>
            {totalCount > 0 && (
                <div className="flex items-center justify-between px-1 sm:px-2 mt-5">
                    <div className="flex flex-1 items-center justify-between">
                        <Pagination paginationButtons={paginationButtons} pageSize={pageSize} pageNumber={pageNumber} totalCount={totalCount} setPageNumber={setPageNumber} totalPages={totalPages} />

                    </div>
                </div>
            )}
        </div>
    </div>)

}

export default CommentsList;

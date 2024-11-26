import { useMutation } from "@tanstack/react-query";
import { createNewComment } from "../../../../util/fetch";
import { useAuth } from "../../../../util/AuthContext";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function CommentInput({ handleInput, value, inputRef, issueStatus })
{
    const useQuery = useQueryClient();
    const { consultationId } = useParams();
    const { loggedUser } = useAuth();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: createNewComment,
        onSuccess: () =>
        {
            useQuery.invalidateQueries({ queryKey: ['comments', consultationId] })
            console.log("Comment successfully submitted!");

            handleInput({ target: { value: "" } });
        },
        onError: (error) =>
        {
            console.error("Error submitting comment:", error);
        },
    });

    const handleSubmit = () =>
    {
        if (value.trim())
        {
            mutate({
                content: value,
                issueStatus,
                issueId: consultationId,
                authorId: loggedUser.id,
            });
        } else
        {
            alert("Comment cannot be empty");
        }
    };

    return (
        <div className="space-y-2 w-full md:w-1/2 mt-3 mb-3">
            <label className="text-sm font-medium text-gray-700">
                Contribute to the discussion!
            </label>
            <textarea
                ref={inputRef}
                rows={4}
                value={value}
                onChange={handleInput}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 
                     placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 
                     focus:ring-cyan-500 focus:ring-opacity-20 shadow-md"
                placeholder="Write your thoughts here..."
            />
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`
        focus:outline-none text-white font-medium rounded-lg 
        text-sm lg:text-base px-2 lg:px-3 py-0.5 lg:py-1 
        transition-all duration-75 active:scale-95
        ${isLoading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-700 hover:bg-green-800 active:bg-green-900"
                        }`}
                >
                    {isLoading ? "Submitting..." : "Comment"}
                </button>
                {isError && (
                    <span className="text-sm text-red-500">
                        Error submitting comment
                    </span>
                )}
                {isSuccess && (
                    <span className="text-sm text-green-500">
                        Comment submitted!
                    </span>
                )}
            </div>
        </div>
    );
}

export default CommentInput;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeleteSolutionModal from "./DeleteSolutionModal";
import { useParams } from "react-router-dom";
import { deleteSolution } from "../../../../util/fetch";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePopup } from "../../../../util/PopupContext";
function DeleteSolution({ solution })
{

    const { triggerPopup } = usePopup();
    const { consultationId } = useParams();
    const useQuery = useQueryClient();
    const [isModalOpen, setModalOpen] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState("");
    const [message, setMessage] = useState("");
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: deleteSolution,
        onSuccess: () =>
        {
            triggerPopup('Solution successfully deleted!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });

            useQuery.invalidateQueries({ queryKey: ['solutions', consultationId] })

        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            alert(`Error: ${err.message}`);
        },
    });

    function handleDelete()
    {
        setModalOpen(true);
    }

    function confirmDelete()
    {
        if (enteredTitle === solution?.title)
        {
            mutate({ solutionId: solution?.id });
            setModalOpen(false);
        } else
        {
            setMessage("Entered name does not match the solution name.");
        }
    }

    function closeModal()
    {
        setModalOpen(false);
        setMessage("");
        setEnteredTitle("");
    }

    return (
        <div className="text-center">
            <button onClick={handleDelete} className="bg-red-700 hover:bg-red-600 text-white p-1 rounded-lg shadow-lg transition-colors transform hover:scale-105  ">
                <div className="flex items-center justify-center">
                    <Trash2 /></div>
            </button>

            {isModalOpen && (
                <DeleteSolutionModal
                    enteredTitle={enteredTitle}
                    setEnteredTitle={setEnteredTitle}
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                    solutionTitle={solution?.title}
                    error={message}
                />
            )}
        </div>
    );
}

export default DeleteSolution;

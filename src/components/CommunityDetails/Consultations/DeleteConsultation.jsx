import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeleteConsultationModal from "./DeleteConsultationModal";
import { useNavigate, useParams } from "react-router-dom";
import { deleteConsultation } from "../../../util/fetch";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePopup } from "../../../util/PopupContext";
function DeleteConsultation({ consultation })
{
    const navigate = useNavigate();
    const { triggerPopup } = usePopup();
    const { id, consultationId } = useParams();
    const useQuery = useQueryClient();
    const [isModalOpen, setModalOpen] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState("");
    const [message, setMessage] = useState("");
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: deleteConsultation,
        onSuccess: () =>
        {
            triggerPopup('Consultation successfully deleted!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            if (consultationId)
                navigate(`/communities/${id}/consultations`)
            useQuery.invalidateQueries({ queryKey: ['issues', id] })

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
        if (enteredTitle === consultation?.title)
        {
            mutate({ consultationId: consultation?.id });
            setModalOpen(false);
        } else
        {
            setMessage("Entered name does not match the consultation name.");
        }
    }

    function closeModal()
    {
        setModalOpen(false);
        setMessage("");
        setEnteredTitle("");
    }

    return (
        <div className=" text-center">
            <button onClick={handleDelete} className="bg-red-700 hover:bg-red-600 text-white p-1 rounded-lg shadow-lg transition-colors transform hover:scale-105  ">
                <div className="flex items-center justify-center">
                    <Trash2 /></div>
            </button>

            {isModalOpen && (
                <DeleteConsultationModal
                    enteredTitle={enteredTitle}
                    setEnteredTitle={setEnteredTitle}
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                    consultationTitle={consultation?.title}
                    error={message}
                />
            )}
        </div>
    );
}

export default DeleteConsultation;

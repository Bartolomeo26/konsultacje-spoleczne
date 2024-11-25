import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DeleteConsultationModal from "./DeleteConsultationModal";
import { useNavigate } from "react-router-dom";
import { deleteConsultation } from "../../../util/fetch";
import { Trash2 } from "lucide-react";
function DeleteConsultation({ consultation })
{

    const [isModalOpen, setModalOpen] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState("");
    const [message, setMessage] = useState("");
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: deleteConsultation,
        onSuccess: () =>
        {
            alert("Consultation successfully deleted!");

        },
        onError: (err) =>
        {
            alert(`Error: ${err.message}`);
        },
    });

    function handleDelete()
    {
        setModalOpen(true);
    }

    function confirmDelete()
    {
        if (enteredTitle === consultation.title)
        {
            mutate({ consultationId: consultation.id });
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
            <button onClick={handleDelete} className="focus:outline-none w-full sm:w-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base p-2.5  ">
                <div className="flex items-center justify-center">
                    <Trash2 size={16} /></div>
            </button>

            {isModalOpen && (
                <DeleteConsultationModal
                    enteredTitle={enteredTitle}
                    setEnteredTitle={setEnteredTitle}
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                    consultationTitle={consultation.title}
                    error={message}
                />
            )}
        </div>
    );
}

export default DeleteConsultation;

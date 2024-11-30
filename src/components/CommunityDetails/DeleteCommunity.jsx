import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteCommunity } from "../../util/fetch";
import DeleteCommunityModal from "./DeleteCommunityModal";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../util/PopupContext";
import { useQueryClient } from "@tanstack/react-query";

function DeleteCommunity({ community })
{
    const queryClient = useQueryClient();
    const { triggerPopup } = usePopup();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [enteredName, setEnteredName] = useState("");
    const [message, setMessage] = useState("");

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: deleteCommunity,
        onSuccess: () =>
        {
            queryClient.invalidateQueries({ queryKey: ["communities"] })
            triggerPopup('Community successfuly deleted!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });

            navigate('/communities')
        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });

        },
    });

    function handleDelete()
    {
        setModalOpen(true);
    }

    function confirmDelete()
    {
        if (enteredName === community.name)
        {
            mutate({ communityId: community.id });
            setModalOpen(false);
        } else
        {
            setMessage("Entered name does not match the community name.");
        }
    }

    function closeModal()
    {
        setModalOpen(false);
        setMessage("");
        setEnteredName("");
    }

    return (
        <div className=" text-center">
            <button onClick={handleDelete} className="focus:outline-none w-full sm:w-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-3 py-2.5  ">
                <div className="flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg> <span>Delete Community</span></div>
            </button>
            <h1 className="text-red-600 text-center">Irreversible operation!</h1>
            {isModalOpen && (
                <DeleteCommunityModal
                    enteredName={enteredName}
                    setEnteredName={setEnteredName}
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                    communityName={community.name}
                    error={message}
                />
            )}

        </div>
    );
}

export default DeleteCommunity;

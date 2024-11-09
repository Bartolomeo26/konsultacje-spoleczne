import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../../util/fetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../util/AuthContext";
import DeleteAccountModal from "./DeleteAccountModal";

function DeleteAccount({ user })
{
    const navigate = useNavigate();
    const { removeToken } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [enteredName, setEnteredName] = useState("");
    const [message, setMessage] = useState("");
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () =>
        {
            removeToken();
            navigate('/');
        }
    });

    function handleDelete()
    {
        // Open the modal
        setModalOpen(true);
    }

    function confirmDelete()
    {
        if (enteredName === user.name)
        {
            // Call the mutation to delete account
            mutate({ userId: user.id });
            setModalOpen(false); // Close the modal after confirming delete
        } else
        {
            setMessage("Entered name does not match.");
        }
    }

    function closeModal()
    {
        setModalOpen(false);
        setMessage("");
        setEnteredName(""); // Reset entered name on close
    }

    return (
        <div className="mb-2 px-7 py-2">
            <button onClick={handleDelete} className="bg-red-600 text-white rounded p-2">Delete account</button>
            <h1 className="text-red-600">You will not be able to undo this operation!</h1>
            {isModalOpen && (
                <DeleteAccountModal
                    enteredName={enteredName}
                    setEnteredName={setEnteredName}
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                    userName={user.name}
                    error={message}
                />
            )}
        </div>
    );
}



export default DeleteAccount;

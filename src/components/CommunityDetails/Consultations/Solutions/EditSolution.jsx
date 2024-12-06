import { useState } from 'react';
import { PenLine } from "lucide-react";
import EditSolutionModal from './EditSolutionModal';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { editSolution } from '../../../../util/fetch';
import { usePopup } from '../../../../util/PopupContext';
import { useQueryClient } from '@tanstack/react-query';
function EditSolution({ solution })
{

    const queryClient = useQueryClient();
    const { triggerPopup } = usePopup();
    const { consultationId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: editSolution,
        onSuccess: () =>
        {
            triggerPopup('Solution successfully edited!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            queryClient.invalidateQueries({ queryKey: ['solutions', consultationId] });
            setIsModalOpen(false);
        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });

        },
    });

    const handleOpenModal = () =>
    {
        setIsModalOpen(true);
    };

    const handleCloseModal = () =>
    {
        setIsModalOpen(false);
    };

    const handleModalSubmit = (updatedSolution) =>
    {
        mutate(updatedSolution);

    };

    return (
        <>
            <button
                type="button"
                onClick={handleOpenModal}
                className="bg-blue-800 hover:bg-blue-700 text-white p-1 rounded-lg shadow-lg transition-colors transform hover:scale-105  "
            >
                <div className="flex items-center justify-center">
                    <PenLine /></div>

            </button>
            {isModalOpen && (
                <EditSolutionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    solution={solution}
                    onSubmit={handleModalSubmit}
                />
            )}
        </>
    );
}

export default EditSolution;

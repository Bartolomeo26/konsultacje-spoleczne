import { useState } from 'react';
import SolutionModal from './SolutionModal';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewSolution } from '../../../../util/fetch';
import { usePopup } from '../../../../util/PopupContext';

function NewSolution({ consultationId })
{
    const { triggerPopup } = usePopup();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewSolution,
        onSuccess: (data) =>
        {
            triggerPopup('Solution created successfully!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            console.log("Consultation created successfully:", data);

            queryClient.invalidateQueries({ queryKey: ['solutions'] })

        },
        onError: (error) =>
        {
            triggerPopup('Failed to create solution: ' + error.info, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
            console.error("Failed to create solution:", error.info);

        },
    });

    const handleModalSubmit = (newSolution) =>
    {
        mutate({ issueId: consultationId, ...newSolution });
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="
                absolute top-2 right-12 z-10
                    bg-green-700 hover:bg-green-800 
                    text-white p-1 rounded-lg 
                    shadow-lg transition-colors
                    transform hover:scale-105
                "
            >
                <Plus />
            </button>
            <SolutionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </>
    );
}

export default NewSolution;
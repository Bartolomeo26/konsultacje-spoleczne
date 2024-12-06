import { useState } from 'react';
import { PenLine } from "lucide-react";
import EditSolutionModal from './EditSolutionModal';

function EditSolution({ solution })
{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () =>
    {
        setIsModalOpen(true);
    };

    const handleCloseModal = () =>
    {
        setIsModalOpen(false);
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

                />
            )}
        </>
    );
}

export default EditSolution;

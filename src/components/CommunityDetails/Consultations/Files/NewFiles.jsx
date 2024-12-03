import { useState } from 'react';
import { PenLine } from "lucide-react";
import FilesModal from './FilesModal';

function NewFiles({ files })
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
                className="
                    absolute top-2 right-12 z-10 
                    bg-blue-800 hover:bg-blue-700 
                    text-white p-1 rounded-lg 
                    shadow-lg transition-colors
                    transform hover:scale-105
                "
            >
                <PenLine />
            </button>
            {isModalOpen && (
                <FilesModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    existingFiles={files} 
                    
                />
            )}
        </>
    );
}

export default NewFiles;

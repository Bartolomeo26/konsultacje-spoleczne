import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { editSolution } from '../../../../util/fetch';
import { usePopup } from '../../../../util/PopupContext';
import { useQueryClient } from '@tanstack/react-query';
import { X, FileUp } from 'lucide-react';

function EditSolutionModal({ isOpen, onClose, solution })
{
    const queryClient = useQueryClient();
    const { triggerPopup } = usePopup();
    const { consultationId } = useParams();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [title, setTitle] = useState(solution.title || '');
    const [description, setDescription] = useState(solution.description || '');

    useEffect(() =>
    {
        setSelectedFiles(solution.files.map((file) => ({ ...file, selected: true })));
        setNewFiles([]);
        setTitle(solution.title || '');
        setDescription(solution.description || '');
    }, [solution]);

    const handleFileChange = (index) =>
    {
        const updatedFiles = [...selectedFiles];
        updatedFiles[index].selected = !updatedFiles[index].selected;
        setSelectedFiles(updatedFiles);
    };

    const handleAddFiles = (event) =>
    {
        const files = Array.from(event.target.files);
        const fileData = [];

        files.forEach((file) =>
        {
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                const base64Data = reader.result.split(',')[1];
                fileData.push({
                    description: file.name,
                    data: base64Data,
                    type: file.type.startsWith('image/') ? 0 : 1,
                });

                if (fileData.length === files.length)
                {
                    setNewFiles((prevFiles) => [...prevFiles, ...fileData]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: editSolution,
        onSuccess: () =>
        {
            triggerPopup('Solution successfully edited!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            onClose();
            queryClient.invalidateQueries({ queryKey: ['solutions', consultationId] });
        },
        onError: (err) =>
        {
            triggerPopup(`Error: ${err.message}`, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });

        },
    });

    const handleSave = () =>
    {
        const filesToSave = [
            ...selectedFiles.filter((file) => file?.selected),
            ...newFiles,
        ];
        const updatedSolution = {
            title,
            description,
            files: filesToSave,
            id: solution.id,
        };

        mutate(updatedSolution);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-[500px] bg-white rounded-xl shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Solution</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-800 transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-800 transition resize-none"
                            rows="3"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Existing Files</h3>
                        {selectedFiles.length === 0 ? (
                            <p className="text-gray-500 italic">No files found</p>
                        ) : (
                            <div className="space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={file.selected}
                                            onChange={() => handleFileChange(index)}
                                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{file.description}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="files"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Upload Files (PDF, Image, etc.):
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-800 transition-all">
                            <input
                                type="file"
                                id="files"
                                accept="image/*,application/pdf"
                                onChange={handleAddFiles}
                                className="w-full p-3 rounded-lg outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-800 hover:file:bg-blue-100"
                                multiple
                            />
                            <FileUp className="mr-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 rounded-b-xl bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditSolutionModal;

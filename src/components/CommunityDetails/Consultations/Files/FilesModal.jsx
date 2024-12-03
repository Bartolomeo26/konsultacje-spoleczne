import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { editFiles } from '../../../../util/fetch';
import { usePopup } from '../../../../util/PopupContext';
import { useQueryClient } from '@tanstack/react-query';
import { X, FileUp } from 'lucide-react'

function FilesModal({ isOpen, onClose, existingFiles })
{
    const useQuery = useQueryClient();
    const { triggerPopup } = usePopup();
    const { consultationId } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([]);

    useEffect(() =>
    {
        setSelectedFiles(existingFiles.map(file => ({ ...file, selected: true })));
        setNewFiles([]); // Ensure new files are reset when modal opens
    }, [existingFiles]);

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
                // Remove the data URI prefix and keep only the Base64 code
                const base64Data = reader.result.split(',')[1];

                fileData.push({
                    description: file.name, // File name
                    data: base64Data, // Pure Base64 string
                    type: file.type.startsWith('image/') ? 0 : 1, // 0 for images, 1 for others
                });

                // Update state once all files are processed
                if (fileData.length === files.length)
                {
                    setNewFiles((prevFiles) => [...prevFiles, ...fileData]);
                }
            };
            reader.readAsDataURL(file); // Read file as Base64
        });
    };


    const mutation = useMutation({
        mutationFn: (filesToSave) => editFiles(filesToSave, consultationId),
        onSuccess: (data) =>
        {
            useQuery.invalidateQueries(['consultation', consultationId]);
            triggerPopup('Files successfully edited!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });

            onClose();
        },
        onError: (error) =>
        {
            triggerPopup('Error: ' + error, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
        }
    });

    const handleSave = () =>
    {
        // Save selected existing files + new files
        const filesToSave = [
            ...selectedFiles.filter(file => file.selected),
            ...newFiles,
        ];
        mutation.mutate(filesToSave);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-[500px] bg-white rounded-xl shadow-2xl border border-gray-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Update Files</h2>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Existing Files Section */}
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

                    {/* Add New Files Section */}
                    <div className="relative">
                        <label htmlFor="files" className="block mb-2 text-sm font-semibold text-gray-700">
                            Upload Files (PDF, Image, etc.):
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <input
                                type="file"
                                id="files"
                                accept="image/*,application/pdf"
                                onChange={handleAddFiles}
                                className="w-full p-3 rounded-lg outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                multiple
                            />
                            <FileUp className="mr-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Modal Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilesModal;

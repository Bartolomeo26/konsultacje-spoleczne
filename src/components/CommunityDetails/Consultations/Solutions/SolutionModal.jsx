import { FileUp } from 'lucide-react';
import { useState } from 'react';

function SolutionModal({ isOpen, onClose, onSubmit })
{
    const [fileData, setFileData] = useState([]);

    const handleFileChange = (e) =>
    {
        const files = Array.from(e.target.files);
        const newFileData = [];

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onloadend = () =>
            {
                const fileType = file.type.startsWith("image") ? 0 : 1;
                newFileData.push({
                    data: reader.result.split(",")[1],
                    description: file.name,
                    type: fileType,
                });


                setFileData((prev) => [...prev, ...newFileData]);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newSolution = {
            title: formData.get('title'),
            description: formData.get('description'),
            files: fileData,
        };
        onSubmit(newSolution);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4 p-6">Add New Solution</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 px-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all"
                            required
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="relative px-6">
                        <label htmlFor="files" className="block mb-2 text-sm font-semibold text-gray-700">
                            Upload Files (PDF, Image, etc.):
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-800 transition-all">
                            <input
                                type="file"
                                id="files"
                                name="files"
                                accept="image/*,application/pdf"
                                className="w-full p-3 rounded-lg outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-800 hover:file:bg-blue-100" multiple
                                onChange={handleFileChange}
                            />
                            <FileUp className="mr-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="mt-4 px-6 py-4 rounded-b-xl bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SolutionModal;
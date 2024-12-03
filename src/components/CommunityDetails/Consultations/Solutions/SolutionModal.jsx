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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">Add New Solution</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label htmlFor="files" className="block mb-2 text-sm font-semibold text-gray-700">
                            Upload Files (PDF, Image, etc.):
                        </label>
                        <input
                            type="file"
                            id="files"
                            name="files"
                            accept="image/*,application/pdf"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
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
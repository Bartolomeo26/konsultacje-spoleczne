import { useState } from "react";

function ConsultationForm({ communityId, onSubmit, children })
{
    const [error, setError] = useState([]);
    const [enteredData, setEnteredData] = useState({
        title: "",
        description: "",
        communityId: parseInt(communityId),
        files: [],
        currentStateEndDate: "",
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setEnteredData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) =>
    {
        const files = Array.from(e.target.files);
        const fileData = [];

        files.forEach((file) =>
        {
            const reader = new FileReader();

            reader.onloadend = () =>
            {
                const fileType = file.type.startsWith("image") ? 0 : 1;
                fileData.push({
                    data: reader.result.split(",")[1], // Extract base64 data
                    description: file.name,
                    type: fileType,
                });

                // Update the state with the new file data once all files are processed
                setEnteredData((prev) => ({
                    ...prev,
                    files: [...fileData],
                }));
            };

            reader.readAsDataURL(file); // Read the file as a Data URL
        });
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const formData = { ...enteredData };



        onSubmit(formData); // Send the form data to the parent function
    };


    return (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center w-full">
            <div className="w-full flex flex-col items-center p-4">
                <div className="w-full mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={enteredData.title}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={enteredData.description}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="files" className="block mb-2 text-sm font-medium text-gray-900">
                        Upload Files (PDF, Image, etc.):
                    </label>
                    <input
                        type="file"
                        id="files"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        multiple
                    />
                    {error.length > 0 && (
                        <p className="text-sm text-red-500">{error.join(", ")}</p>
                    )}
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="currentStateEndDate" className="block mb-2 text-sm font-medium text-gray-900">
                        Current State End Date:
                    </label>
                    <input
                        type="datetime-local"
                        id="currentStateEndDate"
                        name="currentStateEndDate"
                        value={enteredData.currentStateEndDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
            </div>
            <p className="form-actions">{children}</p>
        </form>
    );
}

export default ConsultationForm;

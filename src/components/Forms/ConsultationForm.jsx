import { useState, useEffect } from "react";
import { UsersRound, FileUp, CircleAlert } from "lucide-react";

function ConsultationForm({ communityId, onSubmit, children, label, consultation })
{
    const [error, setError] = useState([]);
    const [enteredData, setEnteredData] = useState({
        title: consultation?.title,
        description: consultation?.description,
        communityId: parseInt(communityId),
        files: [],
        currentStateEndDate: consultation?.currentStateEndDate,
    });

    useEffect(() =>
    {
        setEnteredData((prevData) => ({
            ...prevData, title: consultation?.title,
            description: consultation?.description,
            currentStateEndDate: consultation?.currentStateEndDate,
        }))
    }, [consultation])

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
        const formData = { ...enteredData, id: consultation?.id };
        console.log(formData);
        onSubmit(formData); // Send the form data to the parent function
    };

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl mx-auto space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{label} Consultation</h2>
                <p className="text-gray-500 mt-2">Make your voice louder</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                <div className="relative">
                    <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                        Consultation Title:
                    </label>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={enteredData.title}
                            onChange={handleChange}
                            placeholder="Enter consultation name"
                            className="w-full p-3 rounded-lg outline-none"
                            required
                        />
                        <UsersRound className="mr-3 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={enteredData.description}
                        onChange={handleChange}
                        placeholder="Tell us what issue would you like to discuss..."
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all min-h-[100px]"
                        required
                    />
                </div>
                {label === 'Create' &&
                    <div className="relative">
                        <label htmlFor="files" className="block mb-2 text-sm font-semibold text-gray-700">
                            Upload Files (PDF, Image, etc.):
                        </label>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <input
                                type="file"
                                id="files"
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                                className="w-full p-3 rounded-lg outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                multiple
                            />
                            <FileUp className="mr-3 text-gray-400" />
                        </div>
                        {error.length > 0 && (
                            <p className="text-sm text-red-500 mt-2">{error.join(", ")}</p>
                        )}

                    </div>
                }
                <div className="relative">
                    <label htmlFor="currentStateEndDate" className="block mb-2 text-sm font-semibold text-gray-700">
                        Current State End Date:
                    </label>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                        <input
                            type="datetime-local"
                            id="currentStateEndDate"
                            name="currentStateEndDate"
                            value={enteredData.currentStateEndDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg outline-none bg-white"
                            required
                        />

                    </div>
                </div>

                <div className="flex justify-center">
                    <p className="form-actions">{children}</p>
                </div>
            </form>
        </div>
    );
}

export default ConsultationForm;
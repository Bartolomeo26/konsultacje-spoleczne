import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, Download, FileImage, FileText } from "lucide-react";
import ImageModal from "../Files/ImageModal";
import SolutionVote from "./SolutionVote";
import DeleteSolution from "./DeleteSolution";
import EditSolution from "./EditSolution";

function SolutionCard({ solution, hasVoted, issueStatus })
{
    const [filesExpanded, setFilesExpanded] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    const handlePreview = (image) =>
    {
        setActiveImage(image);
    };
    const base64ToBlob = (base64, type) =>
    {
        const byteCharacters = atob(base64);
        const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type });
    };

    const handleFileClick = (file) =>
    {
        try
        {
            const blob = base64ToBlob(file.data, "application/pdf");
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (error)
        {
            console.error("Error opening PDF:", error);
        }
    };
    const handleDownload = (file) =>
    {
        try
        {
            const mimeType = file.type === 0 ? "image/jpeg" : "application/pdf";
            const byteCharacters = atob(file.data);
            const byteArray = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++)
            {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }

            const blob = new Blob([byteArray], { type: mimeType });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = file.description;
            link.click();

            URL.revokeObjectURL(url);
        } catch (error)
        {
            console.error("Error during download:", error);
        }
    };

    return (
        <>
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-1000 ease-in-out">
                <div className="flex justify-between items-center">


                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h2>
                        <p className="text-gray-600 mb-4">{solution.description}</p>
                    </div>
                    <div className="flex self-start items-center gap-2">
                        {issueStatus === 1 && (
                            <SolutionVote
                                solution={solution}
                                hasVoted={hasVoted}
                            />)}
                        {issueStatus === 0 && (
                            <>
                                <DeleteSolution solution={solution} />
                                <EditSolution files={solution.files} />
                            </>)}

                    </div>
                </div>
                {solution.files?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg">
                        <button
                            onClick={() => setFilesExpanded(!filesExpanded)}
                            className="w-full flex justify-between items-center p-3 hover:bg-gray-100 rounded-t-lg transition-colors"
                        >
                            <div className="flex items-center">
                                {solution.files[0].type === 0 ? (
                                    <FileImage className="mr-2 text-gray-500" size={16} />
                                ) : (
                                    <FileText className="mr-2 text-gray-500" size={16} />
                                )}
                                <h3 className="font-semibold text-gray-800">
                                    Attached Files ({solution.files.length})
                                </h3>
                            </div>
                            <div>
                                {filesExpanded ? (
                                    <ChevronUp className="text-gray-600" size={20} />
                                ) : (
                                    <ChevronDown className="text-gray-600" size={20} />
                                )}
                            </div>
                        </button>

                        {filesExpanded && (
                            <ul className="space-y-1 p-3 pt-0">
                                {solution.files.map((file) => (
                                    <li
                                        key={file.id}
                                        className="flex justify-between items-center hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            {file.type === 0 ? (
                                                <FileImage className="mr-2 text-blue-500" size={16} />
                                            ) : (
                                                <FileText className="mr-2 text-green-500" size={16} />
                                            )}
                                            <span className="text-gray-700">{file.description}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => file.type === 0 ? handlePreview(file) : handleFileClick(file)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                                                title="Preview"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(file)}
                                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors"
                                                title="Download"
                                            >
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                <ImageModal
                    activeImage={activeImage}
                    onClose={() => setActiveImage(null)}
                />
            </div >


        </>
    );
}

export default SolutionCard;
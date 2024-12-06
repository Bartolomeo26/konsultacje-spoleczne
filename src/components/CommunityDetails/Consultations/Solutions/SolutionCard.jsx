import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, Download, FileImage, FileText, Award, ThumbsUp } from "lucide-react";
import ImageModal from "../Files/ImageModal";
import SolutionVote from "./SolutionVote";
import DeleteSolution from "./DeleteSolution";
import EditSolution from "./EditSolution";

function SolutionCard({ solution, permissions, hasVoted, issueStatus, won = false })
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
            <div className={`
                ${won
                    ? 'border-l-4 border-l-emerald-500 bg-emerald-50/30'
                    : 'bg-white border border-gray-100'}
                rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out relative
            `}>
                {won && (
                    <div className="absolute top-2 right-2 flex items-center space-x-2">
                        <div className="flex items-center text-emerald-600">
                            <Award size={20} className="mr-1 stroke-[2.5px]" />
                            <span className="text-xs font-medium uppercase tracking-wider">Chosen By Community as Best Solution</span>
                        </div>
                        <div className="flex items-center bg-emerald-100 px-2 py-1 rounded-full text-emerald-800">
                            <ThumbsUp size={14} className="mr-1 stroke-[2.5px]" />
                            <span className="text-xs font-semibold">
                                {solution.userVotes.length} Votes
                            </span>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h2 className={`
                            text-xl font-bold mb-2 
                            ${won ? 'text-emerald-800' : 'text-gray-900'}
                        `}>
                            {solution.title}
                        </h2>
                        <p className={`
                            mb-4 
                            ${won ? 'text-emerald-900/80' : 'text-gray-600'}
                        `}>
                            {solution.description}
                        </p>
                    </div>
                    <div className="flex self-start items-center gap-2">
                        {issueStatus === 1 && (
                            <SolutionVote
                                solution={solution}
                                hasVoted={hasVoted}
                            />)}
                        {issueStatus === 0 && permissions.isAdmin && (
                            <>
                                <DeleteSolution solution={solution} />
                                <EditSolution solution={solution} />
                            </>)}
                    </div>
                </div>
                {solution.files?.length > 0 && (
                    <div className={`
                        ${won ? 'bg-emerald-50/30' : 'bg-gray-50'} 
                        rounded-lg mt-2
                    `}>
                        <button
                            onClick={() => setFilesExpanded(!filesExpanded)}
                            className={`
                                w-full flex justify-between items-center p-3 
                                ${won
                                    ? 'hover:bg-emerald-100/50'
                                    : 'hover:bg-gray-100'} 
                                rounded-t-lg transition-colors
                            `}
                        >
                            <div className="flex items-center">
                                {solution.files[0].type === 0 ? (
                                    <FileImage className={`mr-2 ${won ? 'text-emerald-600' : 'text-gray-500'}`} size={16} />
                                ) : (
                                    <FileText className={`mr-2 ${won ? 'text-emerald-600' : 'text-gray-500'}`} size={16} />
                                )}
                                <h3 className={`
                                    font-semibold 
                                    ${won ? 'text-emerald-900/80' : 'text-gray-800'}
                                `}>
                                    Attached Files ({solution.files.length})
                                </h3>
                            </div>
                            <div>
                                {filesExpanded ? (
                                    <ChevronUp className={`${won ? 'text-emerald-700' : 'text-gray-600'}`} size={20} />
                                ) : (
                                    <ChevronDown className={`${won ? 'text-emerald-700' : 'text-gray-600'}`} size={20} />
                                )}
                            </div>
                        </button>

                        {filesExpanded && (
                            <ul className="space-y-1 p-3 pt-0">
                                {solution.files.map((file) => (
                                    <li
                                        key={file.id}
                                        className={`
                                            flex justify-between items-center 
                                            ${won ? 'hover:bg-emerald-100/50' : 'hover:bg-gray-100'} 
                                            rounded px-2 py-1 transition-colors
                                        `}
                                    >
                                        <div className="flex items-center">
                                            {file.type === 0 ? (
                                                <FileImage className={`mr-2 ${won ? 'text-emerald-600' : 'text-blue-500'}`} size={16} />
                                            ) : (
                                                <FileText className={`mr-2 ${won ? 'text-emerald-600' : 'text-green-500'}`} size={16} />
                                            )}
                                            <span className={`${won ? 'text-emerald-900/80' : 'text-gray-700'}`}>
                                                {file.description}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => file.type === 0 ? handlePreview(file) : handleFileClick(file)}
                                                className={`
                                                    ${won
                                                        ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50'
                                                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'} 
                                                    p-1 rounded transition-colors
                                                `}
                                                title="Preview"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(file)}
                                                className={`
                                                    ${won
                                                        ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50'
                                                        : 'text-green-600 hover:text-green-800 hover:bg-green-50'} 
                                                    p-1 rounded transition-colors
                                                `}
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
            </div>
        </>
    );
}

export default SolutionCard;
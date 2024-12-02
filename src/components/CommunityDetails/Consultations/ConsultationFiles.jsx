import { useState } from "react";
import { FileText, FileImage, ChevronDown, ChevronUp, Files } from "lucide-react";
import ImageCard from "./Files/ImageCard";
import DocumentCard from "./Files/DocumentCard";
import ImageModal from "./Files/ImageModal";

function ConsultationFiles({ files })
{
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeImage, setActiveImage] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    

    const imageFiles = files?.filter(file => file.type === 0);
    const documentFiles = files?.filter(file => file.type === 1);

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
            const mimeType = file.type === 1 ? "application/pdf" : "image/jpeg";
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

    const handleImageClick = (file) =>
    {
        setActiveImage(file);
    };

    return (
        <div
            onClick={() => !isExpanded && setIsExpanded(true)}
            className={`
                bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-3 relative 
                transition-all duration-300 ease-in-out
                ${!isExpanded ? 'cursor-pointer' : ''}
                ${isExpanded ? 'max-h-[1000px] overflow-visible' : 'max-h-16 overflow-hidden'}
            `}
        >
            {/* Expand/Collapse Button in Top Right Corner */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="
                    absolute top-2 right-2 z-10 
                    bg-cyan-800 hover:bg-cyan-700 
                    text-white p-1 rounded-lg 
                    shadow-lg transition-colors
                    transform hover:scale-105
                "
            >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Subtle Side Label - Only when collapsed */}
            {!isExpanded && (
                <div className="absolute top-2 left-3 text-gray-500 flex items-center">
                    <Files className="mr-1 text-gray-600" size={18} />
                    <h3 className="text-lg text-gray-600 font-semibold">Files</h3>
                </div>
            )}

            {/* Dropdown Content */}
            <div
                className={`
                    transition-all duration-300 ease-in-out
                    ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
            >
                {isExpanded && (
                    <div>
                        {/* Rest of the existing content remains the same */}
                        <div className="flex space-x-4 mb-6 border-b pb-3">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`
                                    flex items-center text-sm font-medium px-3 py-2 rounded-lg 
                                    transition-colors
                                    ${activeCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}
                                `}
                            >
                                <FileText className="mr-2" />
                                All Files
                            </button>
                            <button
                                onClick={() => setActiveCategory('images')}
                                className={`
                                    flex items-center text-sm font-medium px-3 py-2 rounded-lg 
                                    transition-colors 
                                    ${activeCategory === 'images' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}
                                `}
                            >
                                <FileImage className="mr-2" />
                                Images
                            </button>
                            <button
                                onClick={() => setActiveCategory('documents')}
                                className={`
                                    flex items-center text-sm font-medium px-3 py-2 rounded-lg 
                                    transition-colors
                                    ${activeCategory === 'documents' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}
                                `}
                            >
                                <FileText className="mr-2" />
                                Documents
                            </button>
                        </div>

                        {activeCategory === 'all' && (
                            <>

                                {imageFiles.length > 0 && (
                                    <div>
                                        <h3 className="text-gray-600 font-medium mb-3">Images</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {imageFiles.map((file) => (
                                                <ImageCard key={file.id} file={file} handleDownload={handleDownload} handleImageClick={handleImageClick} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Documents Section */}
                                {documentFiles.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-gray-600 font-medium mb-3">Documents</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {documentFiles.map((file) => (
                                                <DocumentCard key={file.id} file={file} handleDownload={handleDownload} handleFileClick={handleFileClick} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeCategory === 'images' && (
                            <div>
                                <h3 className="text-gray-600 font-medium mb-3">Images</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {imageFiles.map((file) => (
                                        <ImageCard key={file.id} file={file} handleDownload={handleDownload} handleImageClick={handleImageClick} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeCategory === 'documents' && (
                            <div className="mt-6">
                                <h3 className="text-gray-600 font-medium mb-3">Documents</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {documentFiles.map((file) => (
                                        <DocumentCard key={file.id} file={file} handleDownload={handleDownload} handleFileClick={handleFileClick} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ImageModal
                activeImage={activeImage}
                onClose={() => setActiveImage(null)}
            />
        </div>
    );
}

export default ConsultationFiles;
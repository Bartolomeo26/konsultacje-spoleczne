import { FileText, FileImage } from "lucide-react";
import { useState } from "react";
import ImageCard from "./Files/ImageCard";
import DocumentCard from "./Files/DocumentCard";
import ImageModal from "./Files/ImageModal";
function ConsultationFiles({ files })
{
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeImage, setActiveImage] = useState(null);


    const imageFiles = files?.filter(file => file.type === 0);
    const documentFiles = files?.filter(file => file.type === 1);

    const base64ToBlob = (base64, type) =>
    {
        const byteCharacters = atob(base64); // Dekodowanie base64
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
        console.log("HALOOOO")
        setActiveImage(file);
    };

    return (<>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-3">
            <div className="flex space-x-4 mb-6 border-b pb-3">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`flex items-center text-sm font-medium px-3 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <FileText className="mr-2" />
                    All Files
                </button>
                <button
                    onClick={() => setActiveCategory('images')}
                    className={`flex items-center text-sm font-medium px-3 py-2 rounded-lg transition-colors ${activeCategory === 'images' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <FileImage className="mr-2" />
                    Images
                </button>
                <button
                    onClick={() => setActiveCategory('documents')}
                    className={`flex items-center text-sm font-medium px-3 py-2 rounded-lg transition-colors ${activeCategory === 'documents' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <FileText className="mr-2" />
                    Documents
                </button>
            </div>

            {activeCategory === 'all' && (
                <>
                    {/* Images Section */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageFiles.map((file) => (
                        <ImageCard key={file.id} file={file} handleDownload={handleDownload} handleImageClick={handleImageClick} />
                    ))}
                </div>
            )}

            {activeCategory === 'documents' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documentFiles.map((file) => (
                        <DocumentCard key={file.id} file={file} handleDownload={handleDownload} handleFileClick={handleFileClick} />
                    ))}
                </div>
            )}
        </div>
        <ImageModal
            activeImage={activeImage}
            onClose={() => setActiveImage(null)}
        />
    </>);
}

export default ConsultationFiles;

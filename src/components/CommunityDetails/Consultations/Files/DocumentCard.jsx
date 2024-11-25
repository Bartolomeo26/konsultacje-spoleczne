import { Download, Eye, FileText } from "lucide-react";
const DocumentCard = ({ file, handleDownload, handleFileClick }) => (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
        <div className="flex items-center space-x-3 mb-3">
            <FileText className="text-gray-400" />
            <p className="text-sm text-gray-700 font-medium truncate">{file.description}</p>
        </div>
        <div className="flex space-x-3">
            <button
                onClick={() => handleFileClick(file)}
                className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm"
            >
                <Eye size={16} className="mr-2" />
                Open
            </button>
            <button
                onClick={() => handleDownload(file)}
                className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm"
            >
                <Download size={16} className="mr-2" />
                Download
            </button>
        </div>
    </div>
);

export default DocumentCard;
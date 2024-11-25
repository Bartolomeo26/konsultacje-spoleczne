import { Download } from "lucide-react";
const ImageCard = ({ file, handleDownload, handleImageClick }) => (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
        <img
            src={`data:image/jpeg;base64,${file.data}`}
            alt={file.description}
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
            onClick={() => handleImageClick(file)}
        />
        <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-700 truncate">{file.description}</p>
            <button
                onClick={() => handleDownload(file)}
                className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
            >
                <Download size={16} />
            </button>
        </div>
    </div>
);

export default ImageCard;
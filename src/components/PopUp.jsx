import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PopUp = ({ message, type = 'info', duration = 3000, onClose }) =>
{
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    // Automatic dismissal effect
    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () =>
    {
        setIsExiting(true);

        setTimeout(() =>
        {
            setIsVisible(false);
            onClose && type != 'error' && onClose();
        }, 300);
    };

    if (!isVisible) return null;

    const typeStyles = {
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        success: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        error: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
        <div
            className={`
                fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${typeStyles[type]} border rounded-lg px-4 py-3 shadow-lg 
                flex items-center justify-between min-w-[250px] max-w-[500px] w-full transition-all duration-300 
                ${isExiting ? 'slide-out-to-top' : 'slide-from-top'}
            `}>
            <span>{message}</span>
            <button
                onClick={handleClose}
                className="ml-4 hover:bg-gray-200 rounded-full p-1">
                <X size={20} />
            </button>
        </div>
    );
};

export default PopUp;
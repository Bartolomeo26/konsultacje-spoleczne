import React from 'react';
import { Info, AlertTriangle, XCircle } from 'lucide-react';

// Define alert types with their corresponding styles and icons
const ALERT_TYPES = {
    info: {
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-900',
        iconColor: 'text-blue-500',
        Icon: Info
    },
    warning: {
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-900',
        iconColor: 'text-yellow-500',
        Icon: AlertTriangle
    },
    danger: {
        bgColor: 'bg-red-100',
        borderColor: 'border-red-500',
        textColor: 'text-red-900',
        iconColor: 'text-red-500',
        Icon: XCircle
    }
};

function Alert({
    message,
    type = 'info',
    className = ''
})
{
    // Get alert type configuration, default to 'info' if not found
    const alertConfig = ALERT_TYPES[type] || ALERT_TYPES.info;

    return (
        <div
            className={`
        ${alertConfig.bgColor} 
        ${alertConfig.borderColor} 
        ${alertConfig.textColor}
        border-t-4 
        w-full 
        lg:w-3/4 
        rounded-b 
        px-4 
        py-3 
        shadow-md 
        ${className}
      `}
            role="alert"
        >
            <div className="flex items-center">
                <div className="py-1 mr-4">
                    <alertConfig.Icon
                        className={`
              ${alertConfig.iconColor} 
              h-6 
              w-6
            `}
                    />
                </div>
                <div>
                    {message.title && (
                        <p className="font-bold">{message.title}</p>
                    )}
                    {message.text && (
                        <p className="text-base">{message.text}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Alert;
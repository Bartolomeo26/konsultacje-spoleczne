import { useState } from "react";
const Tooltip = ({ children, content }) =>
{
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div
            className="relative inline-block text-gray-700"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isOpen && (
                <>
                    {content}
                </>
            )}
        </div>
    );
};
export default Tooltip;
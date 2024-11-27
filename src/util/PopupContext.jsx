import { createContext, useContext, useState } from 'react';
import PopUp from '../components/PopUp';

const PopupContext = createContext();

export const PopupProvider = ({ children }) =>
{
    const [popup, setPopup] = useState({
        isVisible: false,
        message: '',
        type: 'info',
        duration: 2000,
        onClose: null,
    });

    const triggerPopup = (message, type = 'info', duration = 2000, onClose = null) =>
    {
        
        setPopup({ isVisible: false });
        setTimeout(() =>
        {
            setPopup({ isVisible: true, message, type, duration, onClose });
        }, 0);
    };

    const closePopup = () =>
    {
        setPopup((prev) => ({ ...prev, isVisible: false }));
    };

    return (
        <PopupContext.Provider value={{ triggerPopup }}>
            {children}
            {popup.isVisible && (
                <PopUp
                    message={popup.message}
                    type={popup.type}
                    duration={popup.duration}
                    onClose={() =>
                    {
                        closePopup();
                        popup.onClose && popup.onClose();
                    }}
                />
            )}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);

import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({
    activeImage,
    onClose,
    backgroundColor = 'white',
    closeButtonPosition = 'outside'
}) =>
{
    if (!activeImage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative rounded-xl shadow-2xl max-w-4xl w-full bg-${backgroundColor}`}
                    style={{ backgroundColor: backgroundColor !== 'white' ? backgroundColor : undefined }}
                >
                    {closeButtonPosition === 'outside' ? (
                        <button
                            onClick={onClose}
                            className="absolute -top-10 -right-10 text-white hover:text-gray-200 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={32} strokeWidth={3} />
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-white/20 hover:bg-white/40 rounded-full p-2"
                            aria-label="Close modal"
                        >
                            <X size={24} strokeWidth={2} />
                        </button>
                    )}

                    <div className="p-6">
                        <div className="flex flex-col items-center">
                            <img
                                src={`data:image/jpeg;base64,${activeImage.data}`}
                                alt={activeImage.description}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                            />
                            {activeImage.description && (
                                <p className="mt-4 text-center text-black-600  text-sm max-w-xl">
                                    {activeImage.description}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageModal;
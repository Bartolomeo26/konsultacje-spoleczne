function MemberRemoveModal({ isOpen, onClose, onConfirm, memberName })
{
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                <p className="text-gray-600 mb-6">
                    Do you really want to remove <span className="font-bold text-gray-800">{memberName}</span> from the group?
                    This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Confirm Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemberRemoveModal;
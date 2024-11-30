function DeleteConsultationModal({
    enteredTitle,
    setEnteredTitle,
    confirmDelete,
    closeModal,
    consultationTitle,
    error
})
{
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-96">
                <h2 className="text-lg font-bold mb-2">Delete Consultation</h2>
                <p className="text-sm mb-4">
                    Are you sure you want to delete the consultation <strong>{consultationTitle}</strong>? This action
                    is irreversible. Please type the consultation title to confirm.
                </p>
                <input
                    type="text"
                    value={enteredTitle}
                    onChange={(e) => setEnteredTitle(e.target.value)}
                    placeholder="Enter consultation title"
                    className="border rounded p-2 w-full mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-700 rounded px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="bg-red-600 text-white rounded px-4 py-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConsultationModal;

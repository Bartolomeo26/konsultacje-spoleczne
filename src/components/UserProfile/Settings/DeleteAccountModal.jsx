function DeleteAccountModal({ enteredName, setEnteredName, confirmDelete, closeModal, userName, error })
{
    return (
        <div className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold">Confirm Account Deletion</h2>
                <p className="my-2">Are you sure you want to delete your account? Please type your name to confirm:</p>
                <input
                    type="text"
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                    placeholder={`Type "${userName}" to confirm`}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                <p className="text-red-600">{error}</p>
                <div className="flex justify-end mt-4">
                    <button onClick={closeModal} className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2">Cancel</button>
                    <button onClick={confirmDelete} className="bg-red-600 text-white rounded px-4 py-2">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;
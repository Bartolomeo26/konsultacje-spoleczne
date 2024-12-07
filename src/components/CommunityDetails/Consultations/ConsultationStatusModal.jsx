import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { usePopup } from '../../../util/PopupContext';

function ConsultationStatusModal({ currentEndDate, onUpdateEndDate, issueStatus, permissions })
{
    const { triggerPopup } = usePopup();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentEndDate);
    const { consultationId } = useParams();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDateChange = (e) =>
    {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = () =>
    {
        if (issueStatus >= 4)
        {
            triggerPopup('You cannot update the status any further!', 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
            closeModal();
            return null;
        }
        onUpdateEndDate({ currentStateEndDate: selectedDate, issueStatus: issueStatus - 1, consultationId });
        closeModal();
    };



    return (<>
        {issueStatus < 4 && permissions.isAdmin &&
            <button
                onClick={openModal}
                className="absolute right-80 top-0 bg-cyan-700 text-white rounded-full p-1 hover:bg-cyan-600"
            >
                <Settings size={20} />
            </button>}
        {isModalOpen &&
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-50">
                <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-xl text-black font-semibold mb-4 mt-2">Update Status and New Ending Date</h2>

                    <div className="mb-4 text-black">


                        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <input
                                type="datetime-local"
                                id="currentStateEndDate"
                                name="currentStateEndDate"
                                onChange={handleDateChange}
                                value={selectedDate}
                                className="w-full p-3 rounded-lg border outline-none bg-white"
                                required
                            />

                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-cyan-700 text-white py-2 rounded-md hover:bg-cyan-600"
                    >
                        Update Status
                    </button>
                </div>
            </div>}
    </>
    );
}

export default ConsultationStatusModal;
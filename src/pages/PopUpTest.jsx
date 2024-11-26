import { useState } from "react";
import PopUp from "../components/PopUp";
const PopUpTest = () =>
{
    const [alerts, setAlerts] = useState([]);

    const showAlert = (message, type = 'info') =>
    {
        const id = Date.now();
        setAlerts(prev => [...prev, { id, message, type }]);
    };

    return (
        <div>
            <div className="space-x-2">
                <button
                    onClick={() => showAlert('This is an info alert!')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Show Info Alert
                </button>
                <button
                    onClick={() => showAlert('Success! Operation completed.', 'success')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Show Success Alert
                </button>
                <button
                    onClick={() => showAlert('Warning: Something might be wrong.', 'warning')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Show Warning Alert
                </button>
                <button
                    onClick={() => showAlert('Error: Operation failed.', 'error')}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Show Error Alert
                </button>
            </div>

            {alerts.map(alert => (
                <PopUp
                    key={alert.id}
                    message={alert.message}
                    type={alert.type}
                    duration={5000}
                    onClose={() => console.log('Alert closed')}
                />
            ))}
        </div>
    );
};

export default PopUpTest;
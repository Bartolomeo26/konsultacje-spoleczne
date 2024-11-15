import { useState } from "react";
import { Link } from "react-router-dom";
const JoinRequestCard = ({ request, onAccept, onReject }) =>
{
    const { user, status } = request;

    const [requestStatus, setRequestStatus] = useState(status);


    const getStatusMessage = () =>
    {
        switch (requestStatus)
        {
            case 1:
                return "Request Accepted";
            case 2:
                return "Request Rejected";
            default:
                return null;
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md flex items-center justify-between">
            <div>
                <Link to={`/users/${user.id}`}>
                    <h2 className="text-lg font-semibold">{`${user.name} ${user.surname}`}</h2></Link>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">
                    Birth Date: {new Date(user.birthDate).toLocaleDateString()}
                </p>

            </div>
            <div className="flex gap-2">
                {requestStatus === 0 ? (
                    <>
                        <button
                            onClick={() => { onAccept(request.id); setRequestStatus(1) }}
                            className="w-24 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => { onReject(request.id); setRequestStatus(2) }}
                            className="w-24 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </>
                ) : (
                    <span
                        className={`w-40 text-center  py-2 rounded-md text-white font-semibold ${requestStatus === 1 ? "bg-green-400" : "bg-red-400"
                            }`}
                    >
                        {getStatusMessage()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default JoinRequestCard;

import { Link } from "react-router-dom";

function ConsultationCard({ consultation })
{
    let statusColor = "text-black";
    if (consultation.status === 'Resolved')
    {
        statusColor = "text-green-700";
    }
    else if (consultation.status === 'Ongoing')
    {
        statusColor = "text-blue-700";
    }
    else if (consultation.status === 'Ending')
    {
        statusColor = "text-orange-700";
    }
    return (
        <Link to="/communities/1/consultations/1">
            <div className="border-2 bg-white rounded-lg shadow-md p-4 mt-2 w-full">
                <div className="flex ">
                    <h1 className="font-bold text-lg mb-2 w-4/6">{consultation.topic}</h1>
                    <span className="text-md w-2/6 ms-auto text-end">Author: Andrzej Nowicki</span>
                </div>
                <p className="mb-4">
                    {consultation.description}
                </p>
                <div className="flex justify-between text-md">
                    <span>Date: {consultation.date}</span>
                    <div className="flex space-x-2">
                        <span>Answers: 201</span>
                        <span className={statusColor}>Status: {consultation.status}</span>
                    </div>
                </div>
            </div>
        </Link>
    );

}

export default ConsultationCard;
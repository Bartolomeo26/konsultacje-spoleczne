import { Link } from "react-router-dom";

const formatDateTime = (timestamp) =>
{
    const date = new Date(timestamp); // Convert string to Date object

    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0];

    // Format the time as HH:mm
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${formattedDate} ${hours}:${minutes}`;
};

function ConsultationCard({ consultation })
{
    let statusColor = "text-black";
    let statusName = '';
    if (consultation.issueStatus === 0)
    {
        statusName = 'Gathering Information'
        statusColor = "text-blue-500";
    }
    else if (consultation.issueStatus === 1)
    {
        statusName = 'Voting'
        statusColor = "text-orange-700";
    }
    else if (consultation.issueStatus === 2)
    {
        statusName = "In Progress";
        statusColor = "text-blue-700";
    }
    else if (consultation.issueStatus === 3)
    {
        statusName = 'Feedback Collection'
        statusColor = "text-rose-700";
    }
    else if (consultation.issueStatus === 4)
    {
        statusName = 'Completed'
        statusColor = "text-green-700";
    }
    return (
        <Link to="/communities/1/consultations/1">
            <div className="border-2 bg-white rounded-lg text- shadow-md p-4 mt-2 w-full">
                <div className="flex ">
                    <h1 className="font-bold text-lg mb-2 w-4/6">{consultation.title}</h1>
                    <span className="text-md w-2/6 ms-auto text-end">Author: Andrzej Nowicki</span>
                </div>
                <p className="mb-4">
                    {consultation.description}
                </p>
                <div className="flex justify-between text-md">

                    <div className="flex space-x-2">
                        <span>Answers: {consultation.comments.length}</span>
                        <span>{formatDateTime(consultation.createdAt)}</span>

                    </div>
                    <span className={statusColor}>Status: {statusName}</span>
                </div>
            </div>
        </Link>
    );

}

export default ConsultationCard;
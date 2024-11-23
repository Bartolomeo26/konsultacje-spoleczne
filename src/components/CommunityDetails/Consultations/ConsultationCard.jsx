import { Link } from "react-router-dom";
import { formatDateTime } from "../../../util/formatDate";

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
        <Link to={`/communities/1/consultations/${consultation.id}`}>
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

                        <span>{formatDateTime(consultation.createdAt)}</span>
                        <span>Answers: {consultation.comments.length}</span>
                    </div>
                    <span className={statusColor}>Status: {statusName}</span>
                </div>
            </div>
        </Link>
    );

}

export default ConsultationCard;
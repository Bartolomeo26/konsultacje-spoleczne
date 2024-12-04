import { Link, useParams } from "react-router-dom";
import { formatDateTime } from "../../../util/formatDate";
import { PenLine } from "lucide-react";
import DeleteConsultation from "./DeleteConsultation";

function ConsultationCard({ consultation, permissions })
{
    const { id } = useParams();
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
        <div className="relative w-full">
            <Link to={`${consultation.id}`}>
                <div className="border-2 bg-white rounded-lg shadow-md p-4 mt-2 w-full">
                    <div className="flex ">
                        <h1 className="font-bold text-lg mb-2 w-5/6">{consultation.title}</h1>
                    </div>
                    <p className="mb-4 line-clamp-4 w-5/6">
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
            {permissions.isAdmin && <div className="absolute top-3 right-2">
                <div className="flex gap-1">
                    <Link to={`/communities/${id}/consultations/${consultation.id}/edit`}>
                        <button type="button" className=" bg-blue-800 hover:bg-blue-700 text-white p-1 rounded-lg shadow-lg transition-colors transform hover:scale-105">
                            <PenLine />
                        </button></Link>
                    <DeleteConsultation consultation={consultation} />
                </div>
            </div>}
        </div>
    );

}

export default ConsultationCard;
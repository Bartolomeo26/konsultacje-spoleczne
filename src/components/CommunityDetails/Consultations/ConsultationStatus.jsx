import { Clock, MessageCircle, Vote } from "lucide-react";
import { formatDateTime } from "../../../util/formatDate";

function ConsultationStatus({ issueStatus, currentStateEndDate })
{

    let statusIcon = <MessageCircle size={26} />
    let statusName = '';
    if (issueStatus === 0)
    {
        statusName = 'Gathering Information'

    }
    else if (issueStatus === 1)
    {
        statusName = 'Voting'
        statusIcon = <Vote size={26} />
    }
    else if (issueStatus === 2)
    {
        statusName = "In Progress";
        statusIcon = <MessageCircle size={26} />
    }
    else if (issueStatus === 3)
    {
        statusName = 'Feedback Collection'
        statusIcon = <MessageCircle size={26} />
    }
    else if (issueStatus === 4)
    {
        statusName = 'Completed'
        statusIcon = <MessageCircle size={26} />
    }

    return (<div className="absolute left-1/2  -translate-x-1/2 top-0 bg-cyan-800 text-white px-6 py-3 rounded-b-xl shadow-lg" style={{ minWidth: "305px" }}>
        <div className="relative">
            <div className="flex items-center w-full justify-center gap-2 text-lg">
                {statusIcon}
                <span className="font-semibold">Status: {statusName}</span>
            </div>
            {issueStatus < 4 &&
                <div className="flex absolute top-10 left-1/2 -translate-x-1/2  bg-cyan-700 w-10/12 py-2 items-center justify-center text-sm rounded-b-xl gap-1">
                    <Clock size={16} />
                    <span>End date:</span> <span className="font-medium">{formatDateTime(currentStateEndDate)}</span>
                </div>}

        </div>
    </div>)

}
export default ConsultationStatus;
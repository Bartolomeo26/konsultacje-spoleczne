import { formatDateTime } from "../../../util/formatDate";
import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import DeleteConsultation from "./DeleteConsultation";

function ConsultationTopic({ consultation, permissions, issueStatus, admin })
{

    return (<>
        <div className="bg-white rounded-xl relative shadow-md border border-gray-200 p-6 pb-3 hover:border-gray-300 transition-colors">
            <div className="flex flex-col space-y-4">
                <p className="text-gray-600">{admin?.name} {admin?.surname}</p>
                <h1 className="text-3xl font-bold text-gray-900">
                    {consultation?.title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {consultation?.description}
                </p>
            </div>
            <div className="flex justify-end">
                <p className="text-md text-gray-700 leading-relaxed">
                    Date: {formatDateTime(consultation?.createdAt)}
                </p>
            </div>
            {permissions.isAdmin && issueStatus < 4 &&
                <div className="absolute top-3 right-2">
                    <div className="flex gap-1">
                        <Link to={`/communities/${consultation?.communityId}/consultations/${consultation?.id}/edit`}>
                            <button type="button" className=" bg-blue-800 hover:bg-blue-700 text-white p-1 rounded-lg shadow-lg transition-colors transform hover:scale-105">
                                <PenLine />
                            </button></Link>
                        <DeleteConsultation consultation={consultation} />
                    </div>
                </div>}
        </div>
    </>)
}
export default ConsultationTopic;
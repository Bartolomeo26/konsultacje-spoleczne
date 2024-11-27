import { formatDateTime } from "../../../util/formatDate";
import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import DeleteConsultation from "./DeleteConsultation";

function ConsultationTopic({ consultation, permissions })
{

    return (<>
        <div className="bg-white rounded-xl relative shadow-md border border-gray-200 p-6 pb-3 hover:border-gray-300 transition-colors">
            <div className="flex flex-col space-y-4">
                <p className="text-gray-600">Andrzej Nowicki</p>
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
            {permissions.isAdmin &&
                <div className="absolute top-3 right-2">
                    <div className="flex gap-1">
                        <Link to={`/communities/${consultation?.communityId}/consultations/${consultation?.id}/edit`}>
                            <button type="button" className="w-full sm:w-auto focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:text-base p-2.5">
                                <PenLine size={16} />
                            </button></Link>
                        <DeleteConsultation consultation={consultation} />
                    </div>
                </div>}
        </div>
    </>)
}
export default ConsultationTopic;
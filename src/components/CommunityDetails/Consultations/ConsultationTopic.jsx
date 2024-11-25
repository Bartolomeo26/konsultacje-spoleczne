import { formatDateTime } from "../../../util/formatDate";

function ConsultationTopic({ consultation })
{
    const { title, description, date } = consultation;
    return (<>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 pb-3 hover:border-gray-300 transition-colors">
            <div className="flex flex-col space-y-4">
                <p className="text-gray-600">Andrzej Nowicki</p>
                <h1 className="text-3xl font-bold text-gray-900">
                    {title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="flex justify-end">
                <p className="text-md text-gray-700 leading-relaxed">
                    Date: {formatDateTime(date)}
                </p>
            </div>

        </div>
    </>)
}
export default ConsultationTopic;
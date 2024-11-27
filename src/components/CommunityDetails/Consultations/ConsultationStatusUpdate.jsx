import ConsultationStatusModal from "./ConsultationStatusModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePopup } from "../../../util/PopupContext";
import { useParams } from "react-router-dom";
import { changeStatus } from "../../../util/fetch";

function ConsultationStatusUpdate({ currentStateEndDate, issueStatus })
{
    const queryClient = useQueryClient();
    const { triggerPopup } = usePopup();
    const { consultationId } = useParams();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: changeStatus,
        onSuccess: (data) =>
        {
            triggerPopup('Status updated successfully!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            console.log("Consultation edited successfully:", data);
            queryClient.invalidateQueries({ queryKey: ['issue', consultationId] })

        },
        onError: (error) =>
        {
            triggerPopup('Failed to update status: ' + error, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });


        },
    });
    return (
        <div className="absolute top-3 left-36 w-1/2">
            <ConsultationStatusModal currentEndDate={currentStateEndDate} onUpdateEndDate={mutate} issueStatus={issueStatus} />
        </div>
    )
}
export default ConsultationStatusUpdate;
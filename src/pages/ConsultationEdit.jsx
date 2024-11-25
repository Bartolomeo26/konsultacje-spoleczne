import ConsultationForm from "../components/Forms/ConsultationForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editConsultation, getIssue } from "../util/fetch";
import classes from '../styles/DefaultForm.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ConsultationEdit()
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id, consultationId } = useParams();
    console.log(id)
    const { isPending: getPending, error: getError, data: consultation } = useQuery({
        queryKey: ['issue', consultationId],
        queryFn: () => getIssue(consultationId)
    });
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: editConsultation,
        onSuccess: (data) =>
        {
            console.log("Consultation created successfully:", data);
            navigate(`/communities/${id}/consultations`)
            queryClient.invalidateQueries({ queryKey: ['issues', id] })

        },
        onError: (error) =>
        {
            console.error("Failed to edit consultation:", error);

        },
    });

    function handleSubmit(formData)
    {

        mutate({ consultation: formData });
    }

    return (<div className="flex justify-center items-center w-full px-4 py-6 md:p-6">
        <div className="w-full max-w-xl">
            <ConsultationForm onSubmit={handleSubmit} consultation={consultation} communityId={id} label={"Edit"}>


                {isPending && (
                    <>
                        <button type="submit" className={classes.button} disabled >
                            Submitting...
                        </button>
                    </>
                )}
                {!isPending && (
                    <>
                        <button type="submit" className={classes.button}>
                            Edit Consultation
                        </button>
                    </>
                )}


            </ConsultationForm >
        </div>
    </div>)

}

export default ConsultationEdit;
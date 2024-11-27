import ConsultationForm from "../components/Forms/ConsultationForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewConsultation } from "../util/fetch";
import classes from '../styles/DefaultForm.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { usePopup } from "../util/PopupContext";


function ConsultationNew()
{
    const { triggerPopup } = usePopup();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    console.log(id)
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewConsultation,
        onSuccess: (data) =>
        {
            triggerPopup('Consultation successfuly created!', 'success', 3000, () =>
            {
                console.log('Popup closed');
            });
            console.log("Consultation created successfully:", data);
            navigate(`/communities/${id}/consultations`)
            queryClient.invalidateQueries({ queryKey: ['community', id] })

        },
        onError: (error) =>
        {
            triggerPopup('Failed to create consultation:' + error, 'error', 3000, () =>
            {
                console.log('Popup closed');
            });
            console.error("Failed to create consultation:", error);

        },
    });

    function handleSubmit(formData)
    {

        mutate({ consultation: formData });
    }

    return (<div className="flex justify-center items-center w-full px-4 py-6 md:p-6">
        <div className="w-full max-w-xl">
            <ConsultationForm onSubmit={handleSubmit} communityId={id} label={"Create"}>


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
                            Create Consultation
                        </button>
                    </>
                )}


            </ConsultationForm >
        </div>
    </div>)

}

export default ConsultationNew;
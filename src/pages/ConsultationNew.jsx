import ConsultationForm from "../components/Forms/ConsultationForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewConsultation } from "../util/fetch";
import classes from '../styles/DefaultForm.module.css'
import { useNavigate, useParams } from "react-router-dom";


function ConsultationNew()
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewConsultation,
        onSuccess: (data) =>
        {
            console.log("Consultation created successfully:", data);
            navigate(`/communities/${data.id}/consultations`)
            queryClient.invalidateQueries({ queryKey: ['community', data.id] })

        },
        onError: (error) =>
        {
            console.error("Failed to create consultation:", error);

        },
    });

    function handleSubmit(formData)
    {

        mutate({ consultation: formData });
    }

    return (<div className="flex flex-col  items-center mt-10 bg-slate-200 w-1/3 p-6 rounded-lg mb-10">
        <h1 className="text-4xl">Create a new Consultation!</h1>
        <ConsultationForm onSubmit={handleSubmit} communityId={id}>


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
    </div>)

}

export default ConsultationNew;
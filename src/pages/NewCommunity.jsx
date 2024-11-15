import CommunityForm from "../components/Forms/CommunityForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewCommunity } from "../util/fetch";
import classes from '../styles/DefaultForm.module.css'
import { useNavigate } from "react-router-dom";


function NewCommunity()
{
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewCommunity,
        onSuccess: (data) =>
        {
            console.log("Community created successfully:", data);
            navigate(`/communities/${data.id}`)
            queryClient.invalidateQueries({ queryKey: ['communities'] })
            
        },
        onError: (error) =>
        {
            console.error("Failed to create community:", error);
           
        },
    });

    function handleSubmit(formData)
    {

        mutate({ community: formData });
    }

    return (<div className="flex flex-col  items-center mt-10 bg-slate-200 w-1/3 p-6 rounded-lg mb-10">
        <h1 className="text-4xl">Create a new Community!</h1>
        <CommunityForm onSubmit={handleSubmit}>


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
                        Create Community
                    </button>
                </>
            )}


        </CommunityForm >
    </div>)

}

export default NewCommunity;
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

    return (
        <div className="flex justify-center items-center w-full px-4 py-6 md:p-6">
            <div className="w-full max-w-xl"> {/* Ensures consistent width on larger screens */}
                <CommunityForm onSubmit={handleSubmit} title={'Create'}>
                    {isPending ? (
                        <button
                            type="submit"
                            className={classes.button}
                            disabled
                        >
                            Submitting...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={classes.button}
                        >
                            Create Community
                        </button>
                    )}
                </CommunityForm>
            </div>
        </div>
    );

}

export default NewCommunity;
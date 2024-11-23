import CommunityForm from "../components/Forms/CommunityForm";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { editCommunity, getCommunity } from "../util/fetch";
import classes from '../styles/DefaultForm.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function EditCommunity()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isPending: getPending, error: getError, data: community } = useQuery({
        queryKey: ['community', id],
        queryFn: () => getCommunity(id)
    });
    const { mutate, isPending: mutatePending, isError, error: mutateError } = useMutation({
        mutationFn: editCommunity,
        onSuccess: (data) =>
        {
            console.log("Community edited successfully:", data);
            navigate(`/communities/${community.id}`)
            queryClient.invalidateQueries({ queryKey: ['communities'] })

        },
        onError: (error) =>
        {
            console.error("Failed to edit community:", error);
            // Możesz dodać tutaj obsługę błędów
        },
    });

    function handleSubmit(formData)
    {
        console.log('submituje')
        console.log(formData)
        mutate({ community: formData });
    }


    return (<div className="flex flex-col  items-center lg:w-1/3 p-6 rounded-lg mb-10">

        <CommunityForm onSubmit={handleSubmit} community={community} title={'Edit'}>


            {mutatePending && (
                <>
                    <button type="submit" className={classes.button} disabled >
                        Submitting...
                    </button>
                </>
            )}
            {!mutatePending && (
                <>
                    <button type="submit" className={classes.button}>
                        Edit Community
                    </button>
                </>
            )}


        </CommunityForm >
    </div>)

}

export default EditCommunity;
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";

function Test()
{

    const { isPending, error, data: users } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () =>
            await axios.get('https://localhost:7150/api/users', {
                headers: {
                    'accept': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            })
                .then(response =>
                {

                    return response.data.value;


                }),
    })



    if (isPending) return <LoadingIndicator />

    if (error) return 'An error has occurred: ' + error.message
    return (
        <>
            <div>
                <h1>Test</h1>
                <ul>
                    {users.length > 0 && users.map((user) =>
                    {
                        return (
                            <li key={user.id} className="text-black">Email: {user.email} Name: {user.name} Activated: {user.confirmed.toString()}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default Test;

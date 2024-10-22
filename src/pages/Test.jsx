import { useEffect, useState } from "react";
import axios from "axios";


function Test()
{
    const [users, setUsers] = useState([]);


    useEffect(() =>
    {
        axios.get('https://localhost:7150/api/users', {
            headers: {
                'accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        })
            .then(response =>
            {

                const newUsers = response.data.value;
                console.log(newUsers);
                setUsers(newUsers);

            })
            .catch(error =>
            {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <>
            <div>
                <h1>Test</h1>
                <ul>
                    {users.length > 0 && users.map((user) =>
                    {
                        return (
                            <li key={user.id} className="text-black">Email: {user.email} Name: {user.name}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default Test;

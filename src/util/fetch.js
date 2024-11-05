import axios from "axios";

export async function createNewUser(userData)
{
    console.log(userData.user);
    await axios.post(`https://localhost:7150/api/users`, userData.user, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response =>
    {
        console.log(response);
        return response.data.user;
    })
        .catch(error =>
        {

            const err = new Error('An error occurred while creating the user');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;

            throw err;
        });


}

export async function LogIn(userData)
{
    try
    {
        const response = await axios.post(`https://localhost:7150/api/authentication`, userData.user, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error)
    {
        const err = new Error('An error occurred while creating the user');
        err.code = error.response?.status;
        err.info = error.response?.data;
        err.message = error.message;
        throw err;
    }
}

export async function ConfirmMail(confirmationCode)
{

    try
    {
        const response = await axios.post(`https://localhost:7150/api/users/confirm/${confirmationCode.code}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('poszlo: ' + response.data);
        return response.data;
    } catch (error)
    {
        const err = new Error('An error occured while activating an email');
        console.log('error: ' + error);
        err.code = error.response?.status;
        err.info = error.response?.data;
        err.message = error.message;
        throw err;
    }
}

export async function resetPassword(userData)
{

    try
    {
        const response = await axios.post(
            `https://localhost:7150/api/users/getpassword`,
            null,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    email: userData.email,
                },
            }
        );


        return response.data;
    } catch (error)
    {
        const err = new Error('An error occurred while resetting the password');
        err.code = error.response?.status;
        err.info = error.response?.data;
        err.message = error.message;
        throw err;
    }
}

export async function getUser(id)
{
    return await axios.get(`https://localhost:7150/api/users/${id}`, {
        headers: {
            'Accept': 'application/vnd.socialconsultations.user.full+json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    }).then(response =>
    {
        console.log("GET USER: ", response.data)
        return response.data
    }
    );
}

export async function getSelf(token)
{

    return await axios.get("https://localhost:7150/api/users/self", {
        headers: {
            'Accept': 'application/vnd.socialconsultations.user.full+json',
            "Authorization": `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    }).then(response =>
    {

        return response.data;
    });
}

export async function updateUserProfile(data)
{
    const token = localStorage.getItem('token');
    const { formData: userData, user } = data;
    console.log(userData);
    return await axios.patch(
        `https://localhost:7150/api/users/${user.id}`,
        [
            { op: "replace", path: "/name", value: userData.name },
            { op: "replace", path: "/surname", value: userData.surname },
            { op: "replace", path: "/email", value: userData.email },
            { op: "replace", path: "/birthDate", value: userData.birthDate }
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}
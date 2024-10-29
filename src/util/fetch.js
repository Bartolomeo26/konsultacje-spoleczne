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

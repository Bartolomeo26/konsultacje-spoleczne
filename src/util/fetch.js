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
            userData.email,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
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
    console.log('wywoluje')
    if (!token)
        return

    return await axios.get("https://localhost:7150/api/users/self", {
        headers: {
            'Accept': 'application/vnd.socialconsultations.user.full+json',
            "Authorization": `Bearer ${token}`
        }
    }).then(response =>
    {
        console.log("GET SELF", response.data)
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

export async function updateEmail(data)
{
    const token = localStorage.getItem('token');
    console.log(data)

    return await axios.patch(
        `https://localhost:7150/api/users/${data.userId}`,
        [
            { op: "replace", path: "/email", value: data.email },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function updatePassword(data)
{
    const token = localStorage.getItem('token');
    console.log(data)

    return await axios.patch(
        `https://localhost:7150/api/users/${data.userId}`,
        [
            { op: "replace", path: "/password", value: data.password },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function deleteAccount(user)
{
    const token = localStorage.getItem('token');

    console.log("USUWANIE!", user.userId)
    return await axios.delete(
        `https://localhost:7150/api/users/${user.userId}`,
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function createNewCommunity(communityData)
{
    const token = localStorage.getItem('token');

    communityData.community.avatar = JSON.parse(communityData.community.avatar);
    communityData.community.background = JSON.parse(communityData.community.background);
    if (communityData.community.isPublic === 'on') communityData.community.isPublic = true;
    else communityData.community.isPublic = false;
    return await axios.post(`https://localhost:7150/api/communities`, communityData.community, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response =>
    {

        return response.data;
    })
        .catch(error =>
        {
            const err = new Error('An error occurred while creating the community');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function getCommunities(pageNumber = 1, pageSize = 20)
{
    return await axios.get(`https://localhost:7150/api/communities?PageNumber=${pageNumber}&PageSize=${pageSize}&Fields=id%2C%20name%2C%20description%2C%20avatar%2C%20latitude%2C%20longitude`, {
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full.hateoas+json',
        }
    }).then(response =>
    {
        console.log("GET COMMUNITIES: ", response.data);
        return response.data;
    });
}


export async function getCommunitiesList()
{
    return await axios.get('https://localhost:7150/api/communities?Fields=id%2C%20name%2C%20description%2C%20avatar%2C%20latitude%2C%20longitude', {
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full+json',

        }
    }).then(response =>
    {
        console.log("GET COMMUNITIES: ", response.data)
        return response.data
    }
    );
}

export async function getCommunitiesToMap()
{
    return await axios.get('https://localhost:7150/api/communities?Fields=name%2C%20latitude%2C%20longitude', {
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full+json',

        }
    }).then(response =>
    {
        console.log("GET COMMUNITIES TO MAP: ", response.data)
        return response.data
    }
    );
}

export async function getCommunity(id)
{
    return await axios.get(`https://localhost:7150/api/communities/${id}`, {
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full+json',

        }
    }).then(response =>
    {
        console.log("GET COMMUNITY: ", response.data)
        return response.data
    }
    );
}
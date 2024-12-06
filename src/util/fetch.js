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
            "Authorization": `Bearer ${token}`,
            'Cache-Control': "no-cache"
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
                'Content-Type': 'application/json',
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

export async function createNewConsultation(consultationData)
{
    const token = localStorage.getItem('token');
    const { consultation } = consultationData;
    console.log('creating consultion', consultation)
    return await axios.post(`https://localhost:7150/api/issues`, consultation, {
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
            const err = new Error('An error occurred while creating the consultation');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function editCommunity(communityData)
{

    const token = localStorage.getItem('token');
    const { community } = communityData;
    community.avatar = JSON.parse(community.avatar);
    community.background = JSON.parse(community.background);
    if (community.isPublic === 'on') community.isPublic = true;
    else community.isPublic = false;
    console.log(community);
    return await axios.patch(
        `https://localhost:7150/api/communities/${community.id}`,
        [
            { op: "replace", path: "/name", value: community.name },
            { op: "replace", path: "/description", value: community.description },
            { op: "replace", path: "/latitude", value: community.latitude },
            { op: "replace", path: "/longitude", value: community.longitude },
            { op: "replace", path: "/avatar", value: community.avatar },
            { op: "replace", path: "/background", value: community.background },
            { op: "replace", path: "/isPublic", value: community.isPublic }
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function editConsultation(consultationData)
{

    const token = localStorage.getItem('token');
    const { consultation } = consultationData;

    return await axios.patch(
        `https://localhost:7150/api/issues/${consultation.id}`,
        [
            { op: "replace", path: "/title", value: consultation.title },
            { op: "replace", path: "/description", value: consultation.description },

            { op: "replace", path: "/currentStateEndDate", value: consultation.currentStateEndDate },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function deleteCommunity({ communityId })
{
    const token = localStorage.getItem('token');

    console.log("USUWANIE!", communityId)
    return await axios.delete(
        `https://localhost:7150/api/communities/${communityId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function deleteConsultation({ consultationId })
{
    const token = localStorage.getItem('token');

    console.log("USUWANIE!", consultationId)
    return await axios.delete(
        `https://localhost:7150/api/issues/${consultationId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function getCommunities(
    pageNumber = 1,
    pageSize = 20,
    searchQuery = '',
    sortField = 'Id',
    sortOrder = 'desc'
)
{
    console.log('Fetching communities with advanced sorting');

    // Construct the OrderBy parameter
    const orderByParam = `${sortField} ${sortOrder}`;

    return await axios.get(`https://localhost:7150/api/communities`, {
        params: {
            SearchQuery: searchQuery,
            PageNumber: pageNumber,
            PageSize: pageSize,
            Fields: 'id,name,description,avatar,latitude,longitude',
            OrderBy: orderByParam
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full.hateoas+json',
        }
    }).then(response =>
    {
        console.log("GET COMMUNITIES: ", response.data);
        return response;
    });
}

export async function getCommunitiesNumber(searchQuery = '')
{
    return await axios.get(`https://localhost:7150/api/communities?SearchQuery=${searchQuery}&Fields=id`, {
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full+json',
        }
    }).then(response =>
    {
        console.log("GET COMMUNITIES NUMBER: ", response.data);
        return response.data;
    });
}


export async function getCommunitiesList(queryString = '')
{
    return await axios.get(`https://localhost:7150/api/communities?Fields=id,name,avatar,latitude,description,longitude,members${queryString}`, {
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
    return await axios.get('https://localhost:7150/api/communities?Fields=name,latitude,longitude', {
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
    console.log('probuje', id)
    return await axios.get(`https://localhost:7150/api/communities/${id}`, {
        params: {
            Fields: 'id, administrators, members, avatar, background, name, description, isPublic, joinRequests, latitude, longitude'
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.community.full+json',
            'Cache-Control': 'no-cache'

        }
    }).then(response =>
    {
        console.log("GET COMMUNITY: ", response.data)
        return response.data
    }
    );
}

export async function joinToCommunity(community)
{
    const token = localStorage.getItem('token');
    console.log("KAWJWAFJAWFAm", community)

    return await axios.post(`https://localhost:7150/api/communities/${community.id}/joinrequests`, null, {
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
            const err = new Error('An error occurred while sending join request');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function acceptJoinToCommunity(data)
{
    const token = localStorage.getItem('token');
    console.log("AKCEPTUJE")
    console.log('no', data);
    return await axios.post(`https://localhost:7150/api/communities/${data.communityId}/joinrequests/${data.joinRequestId}/accept`, null, {
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
            const err = new Error('An error occurred while accepting join request');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function rejectJoinToCommunity(data)
{
    const token = localStorage.getItem('token');
    console.log("REJECTUJE")
    console.log('no', data);
    return await axios.post(`https://localhost:7150/api/communities/${data.communityId}/joinrequests/${data.joinRequestId}/reject`, null, {
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
            const err = new Error('An error occurred while rejecting join request');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function getIssues(
    pageNumber = 1,
    pageSize = 10,
    searchQuery = '',
    sortField = 'Id',
    sortOrder = 'desc',
    communityId
)
{
    console.log('Fetching issues with advanced sorting');

    // Construct the OrderBy parameter
    const orderByParam = `${sortField} ${sortOrder}`;

    return await axios.get(`https://localhost:7150/api/issues`, {
        params: {
            communityId,
            SearchQuery: searchQuery,
            PageNumber: pageNumber,
            PageSize: pageSize,
            Fields: 'id,title,description,comments,issueStatus,createdAt',
            OrderBy: orderByParam
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.issue.full.hateoas+json',
            'Cache-Control': 'no-cache'
        }
    }).then(response =>
    {
        console.log("GET ISSUES: ", response.data);
        return response;
    });
}

export async function getIssue(id)
{
    return await axios.get(`https://localhost:7150/api/issues/${id}`, {
        params: {
            Fields: 'id,communityId, issueStatus, createdAt, currentStateEndDate, title, description, files',
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.issue.full+json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    }).then(response =>
    {
        console.log("GET ISSUE: ", response.data)
        return response.data
    }
    );
}

export async function removeMember(communityId, memberId)
{
    const token = localStorage.getItem("token");

    try
    {
        const response = await axios.delete(
            `https://localhost:7150/${communityId}/members/${memberId}`,
            {
                headers: {
                    "Content-Type": "application/json-patch+json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data; // Return the updated member info, or just the ID for simplicity
    } catch (error)
    {
        console.error("Error while removing member:", error);
        throw error;
    }
}

export async function createNewComment(commentData)
{
    const token = localStorage.getItem('token');
    console.log(commentData);
    console.log('creating comment', commentData)
    return await axios.post(`https://localhost:7150/api/comments`, commentData, {
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
            const err = new Error('An error occurred while creating the comment');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });
}

export async function getComments(
    pageNumber = 1,
    pageSize = 10,
    sortField = 'Id',
    sortOrder = 'desc',
    issueId
)
{
    console.log('Fetching comments with advanced sorting');

    // Construct the OrderBy parameter
    const orderByParam = `${sortField} ${sortOrder}`;

    return await axios.get(`https://localhost:7150/api/comments`, {
        params: {
            issueId,
            PageNumber: pageNumber,
            PageSize: pageSize,
            OrderBy: orderByParam
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.comment.full.hateoas+json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    }).then(response =>
    {
        console.log("GET COMMENTS: ", response.data);
        return response;
    });
}

export async function upVoteComment(commentId)
{
    const token = localStorage.getItem('token');
    return await axios.post(`https://localhost:7150/api/comments/${commentId}/upvotes`, null, {
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
            const err = new Error('An error occurred while upvoting the comment');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });

}

export async function getClosestCommunities(data)
{
    console.log(data);
    return await axios.post(`https://localhost:7150/closest/100`, data, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json-patch+json',
        }
    }).then(response =>
    {
        console.log("GET CLOSEST COMMUNITIES: ", response.data);
        return response.data;
    });
}

export async function changeStatus(consultationData)
{

    const token = localStorage.getItem('token');
    console.log('changuje', consultationData)
    const { currentStateEndDate, issueStatus, consultationId } = consultationData;
    return await axios.patch(
        `https://localhost:7150/api/issues/${consultationId}`,
        [
            { op: "replace", path: "/issueStatus", value: issueStatus },
            { op: "replace", path: "/currentStateEndDate", value: currentStateEndDate },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function getSolutions(issueId)
{
    console.log('Fetching solutions');

    return await axios.get(`https://localhost:7150/api/solutions`, {
        params: {
            issueId,
        },
        headers: {
            'Accept': 'application/vnd.socialconsultations.solution.full.hateoas+json',
            'Cache-Control': 'no-cache'
        }
    }).then(response =>
    {
        console.log("GET SOLUTIONS: ", response.data);
        return response.data;
    });
}

export async function createNewSolution(solutionData)
{
    const token = localStorage.getItem('token');

    console.log(solutionData);

    return await axios.post('https://localhost:7150/api/solutions', solutionData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response =>
    {
        return response.data;
    }).catch(error =>
    {
        const err = new Error('An error occurred while creating the solution');
        err.code = error.response?.status;
        err.info = error.response?.data;
        err.message = error.message;
        console.log(error);
        throw err;
    });
}

export async function editFiles(files, consultationId)
{

    const token = localStorage.getItem('token');
    console.log(files);

    return await axios.patch(
        `https://localhost:7150/api/issues/${consultationId}`,
        [
            { op: "replace", path: "/files", value: files },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function upVoteSolution(solutionId)
{
    const token = localStorage.getItem('token');
    return await axios.post(`https://localhost:7150/api/solutions/${solutionId}/upvotes`, null, {
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
            const err = new Error('An error occurred while upvoting the solution');
            err.code = error.response?.status;
            err.info = error.response?.data;
            err.message = error.message;
            console.log(error);
            throw err;
        });

}

export async function deleteSolution({ solutionId })
{
    const token = localStorage.getItem('token');

    console.log("USUWANIE!", solutionId)
    return await axios.delete(
        `https://localhost:7150/api/solutions/${solutionId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function editSolution(solutionData)
{

    const token = localStorage.getItem('token');
    console.log('halko', solutionData)

    return await axios.put(
        `https://localhost:7150/api/solutions/${solutionData.id}`,
        solutionData,
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export async function editSolutionPatch(solutionData)
{

    const token = localStorage.getItem('token');
    console.log('halko', solutionData)

    return await axios.patch(
        `https://localhost:7150/api/solutions/${solutionData.id}`,
        [
            { op: "replace", path: "/title", value: solutionData.title },
            { op: "replace", path: "/description", value: solutionData.description },
            { op: "replace", path: "/files", value: solutionData.files },
        ],
        {
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}
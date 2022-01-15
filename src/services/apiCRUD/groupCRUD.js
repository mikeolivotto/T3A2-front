import axios from "axios";

export const createNewGroup = async (groupDetails, idToken) => {
    let { groupName, adminId, joinCode, members, pendingMembers } = groupDetails;
    console.log(groupName)
    console.log(adminId)
    console.log(joinCode)
    console.log(members)
    console.log(pendingMembers)

    let groupInfo = await axios.post(
        process.env.REACT_APP_API + "/group",
        {
            groupName: groupName,
            adminId: adminId,
            joinCode: joinCode,
            members: members,
            pendingMembers: pendingMembers
        },
        {
            headers: {
                authorization: idToken,
            },
        }
    );
    return groupInfo;
};

export const getSpecificGroup = async (groupId, idToken) => {
    let response = await axios.get(
        process.env.REACT_APP_API + `/group/${groupId}`,
        {
            headers: {
                authorization: idToken,
            },
        }
    );
    return response;
};

export const getGroupGames = async (groupId) => {
    let response = await axios.get(process.env.REACT_APP_API + `/group/${groupId}/games`)
    return response
}

export const joinGroup = async (joinCode, idToken) => {
    let response = await axios.put(process.env.REACT_APP_API + "/group/join",
        {
            joinCode: joinCode
        },
        {
            headers: {
                authorization: idToken,
            },
        }
    )
    return response;
}

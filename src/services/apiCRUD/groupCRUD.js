import axios from "axios";

export const createNewGroup = async (groupDetails, idToken) => {
    let { groupName, adminId, joinCode, members, pendingMembers } = groupDetails;

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

export const updateSpecificGroup = async(groupId, idToken, username, acceptance) => {    
    let group = await getSpecificGroup(groupId, idToken)

    let groupDetails = group.data
    const members = groupDetails.members
    const pending = groupDetails.pendingMembers

    const indexInPending = pending.indexOf(username)

    // whether player accepts or rejects, they should be removed from pending
    pending.splice(indexInPending, 1)

    if (acceptance === "accept") {
        // add to members, remove from pending
        members.push(username)
    }
    
    // update groupDetails object, in preparation to update group in db
    groupDetails = {
        ...groupDetails,
        members: members,
        pendingMembers: pending
    }
    
    console.log(groupDetails)

    // send off to the db to update the specific group
    let response = await axios.put(
        process.env.REACT_APP_API + `/group/${groupId}`,
        {
            headers: {
                authorization: idToken,
            },
            groupDetails
        }
        
    );
    return response;
}

export const getGroupGames = async (groupId, username) => {
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

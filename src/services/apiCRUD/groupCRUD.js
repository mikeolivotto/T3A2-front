import axios from "axios";

export const createNewGroup = async (groupDetails, idToken) => {
  let { groupName, adminId, members } = groupDetails;
  let groupInfo = await axios.post(
    process.env.REACT_APP_API + "/group",
    {
      groupName: groupName,
      adminId: adminId,
      members: members,
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

export const getGroupGames = async(groupId) => {
  let response = await axios.get(process.env.REACT_APP_API + `/group/${groupId}/games`)
  return response
}

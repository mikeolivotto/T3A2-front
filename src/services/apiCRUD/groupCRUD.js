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

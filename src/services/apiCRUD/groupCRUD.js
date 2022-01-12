import axios from "axios";

export const createNewGroup = async (groupDetails) => {
  let { groupName, members } = groupDetails;
  let groupInfo = await axios.post(process.env.REACT_APP_API + "/group", {
    groupName: groupName,
    // adminId: adminId,
    members: members,
  });
  return groupInfo;
};

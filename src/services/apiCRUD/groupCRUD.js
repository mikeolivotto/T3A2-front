import axios from 'axios';


export const getSpecificGroup = async (groupId, idToken) => {
    let response = await axios.get(process.env.REACT_APP_API+`/group/${groupId}`,{
        headers: {
            authorization: idToken,

        }
    })
    return response
}
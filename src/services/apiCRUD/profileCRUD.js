import axios from 'axios';

export const signUp = async (signUpDetails) => {
    let response = await axios.post(process.env.REACT_APP_API+'/profiles/sign-up', signUpDetails)
    return response
}

export const checkUniqueUsername = async (username) => {
    let response = await axios.get(process.env.REACT_APP_API+'/profiles/unique', {username:username})
    return response 
}


export const signIn = async(signInDetails) => {
    let {email, password} = signInDetails
    let tokenInfo = await axios.post(process.env.REACT_APP_API+'/profiles/sign-in', 
    {
        email: email,
        password: password
    })
    return tokenInfo
}

export const getSpecificProfile = async (profileId, idToken) => {
    let response = await axios.get(process.env.REACT_APP_API+`/profiles/${profileId}`,{
        headers: {
            authorization: idToken 
        }
    })
    return response
}
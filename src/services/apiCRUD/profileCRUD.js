import axios from 'axios';


export const signIn = async(signInDetails) => {
    let {email, password} = signInDetails
    let tokenInfo = await axios.post(process.env.REACT_APP_API+'/profiles/sign-in', 
    {
        email: email,
        password: password
    })
    return tokenInfo
}


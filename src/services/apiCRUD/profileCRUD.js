import axios from 'axios';


let signIn = (signInDetails) => {
    axios.get(process.env.API+'/sign-in')
}


module.exports = {
    signIn
}
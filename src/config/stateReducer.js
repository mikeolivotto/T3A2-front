
export const stateReducer = (state, action) => {
    switch (action.type) {
        case "setLoggedInUser":
            return {
                ...state,
                idToken: action.data[0].idToken,
                profileData: action.data[1]
            }
        case "updateIdToken":
            return {
                ...state,
                idToken: action.data
            }
        case "setProfile":
            return {
                ...state,
                profileData: action.data
            }
        case "removeProfile":
            return {
                ...state,
                idToken: null,
                profileData: null
            }

        default:
            return state
    }
}


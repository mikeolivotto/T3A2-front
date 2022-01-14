export const stateReducer = (state, action) => {
  switch (action.type) {
    case "setLoggedInUser":
      return {
        ...state,
        idToken: action.data[0].idToken,
        profileData: action.data[1],
      };
    case "setProfile":
      return {
        ...state,
        profileData: action.data,
      };
    case "removeProfile":
      return {
        ...state,
        idToken: null,
        profileData: null,
      };
    case "setGroup":
      return {
        ...state,
        groupData: action.data,
      };

    case "setGame":
      return {
        ...state,
        gameInPlay: action.data,
      };

    default:
      return state;
  }
};

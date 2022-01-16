import axios from "axios";

export const createGame = (gameData, idToken) => {
    let response = axios.post(process.env.REACT_APP_API + "/game", gameData, {
        headers: {
            authorization: idToken,
        },
    });
    return response;
};

export const getSpecificGame = (gameId, idToken) => {
    let response = axios.get(process.env.REACT_APP_API + `/game/${gameId}`, {
        headers: {
            authorization: idToken,
        },
    })
    return response
}

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER= 'REMOVE_USER';

const addUser = (user:any) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}



const actionUser = {
    addUser,
    removeUser
}

export default actionUser

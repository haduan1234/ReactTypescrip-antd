import { ADD_USER, REMOVE_USER } from './action'

const User = {
    items:[]
}

const UserReducer = (state = User, action:any) => {
    switch (action.type) {
        case ADD_USER:
          return {
              ...state,
              items: [...state.items, action.payload]
          }
        case REMOVE_USER:
            const stateNew ={
                items:[]
            }
            return stateNew;
        default:
            return state;
    }
}



export default UserReducer;
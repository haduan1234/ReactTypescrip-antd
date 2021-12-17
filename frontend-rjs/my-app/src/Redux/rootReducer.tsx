import {combineReducers } from "redux"
import user from "../Reducer/useReducer";

const rootReducer = combineReducers({
    user : user
})

export default rootReducer
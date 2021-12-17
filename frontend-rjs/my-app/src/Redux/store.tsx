import rootReducer from "./rootReducer";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    // composeWithDevTools(applyMiddleware(...middleware))
    );
export default store;
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer'; 


let rootReducers = combineReducers({
    auth: authReducer,
    cart: cartReducer
})


export default rootReducers;
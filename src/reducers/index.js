import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import {firebaseReducer} from 'react-redux-firebase'
export default combineReducers({
    myusermodel,
    firebase: firebaseReducer
})
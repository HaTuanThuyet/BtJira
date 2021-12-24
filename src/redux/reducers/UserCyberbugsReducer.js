import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs";

let usLogin = {};
let usSignUp = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin : usLogin,
    userSignUp : usSignUp,

    userSearch: [],
    arrUser: [],

   
}
export const UserLoginCyberReducer= (state=stateDefault,action)=>{
switch(action.type){
    case USLOGIN:{
        state.userLogin=action.userLogin
        return {...state}

    }
    case 'USSIGNUP':{
        state.userSignUp=action.userSignUp
        return {...state}

    }
    case 'GET_USER_SEARCH':{
        state.userSearch = action.lstUserSearch;
        // console.log('stateUser',state.userSearch);
        return {...state}
    }
    case 'GET_USER_BY_PROJECT_ID':{
        state.arrUser = action.arrUser;
        return {...state}
    }
    default :return{...state}
}
}
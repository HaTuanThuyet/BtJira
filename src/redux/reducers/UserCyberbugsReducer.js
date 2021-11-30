import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin : usLogin,
    userSearch: []
}
export const UserLoginCyberReducer= (state=stateDefault,action)=>{
switch(action.type){
    case USLOGIN:{
        state.userLogin=action.userLogin
        return {...state}

    }
    case 'GET_USER_SEARCH':{
        state.userSearch = action.lstUserSearch;
        // console.log('stateUser',state.userSearch);
        return {...state}
    }
    default :return{...state}
}
}
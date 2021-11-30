import { USER_SIGNIN_SAGA } from "../constants/Cyberbugs"


export const signinCyberbugsAction = (email, password) => {
    return {
        type: USER_SIGNIN_SAGA,
        userLogin: {
            email: email,
            password: password
        }
    }
}
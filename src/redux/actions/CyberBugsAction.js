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

export const signupCyberbugsAction = (email, password,name,phoneNumber) => {
    return {
        type: 'USER_SIGNUP_SAGA',
        userSignup: {
            email: email,
            password: password,
            name:name,
            phoneNumber:phoneNumber

        }
    }
}
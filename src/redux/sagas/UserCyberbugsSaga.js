import Axios from 'axios'
import { fork, take, call, delay, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { CyberbugsService } from '../../Pages/Services/CyberbugsService';
import { STATUS_CODE, TOKEN, TOKEN1, USER_LOGIN } from '../../util/constants/settingSystem';
import { USER_SIGNIN_SAGA, USLOGIN } from '../constants/Cyberbugs';

// Đăng Ký
function* signUpSaga(action) {
    console.log(action);

    yield put({
        type: 'DISPLAY_LOADING'
    })
    yield delay(500);

    // Gọi Api
    try {
        const { data, status } = yield CyberbugsService.signupCyberBugs(action.userSignup);
        // Lưu vào Localstore
        localStorage.setItem(TOKEN1, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: 'USSIGNUP',
            userSignup: data.userSignup
        })
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/login');
        // console.log(data);

    } catch (er) {
        console.log(er.response.data);
    }
    yield put({
        type: 'HIDE_LOADING'
    })
}

export function* theoDoiSignUp() {
    yield takeLatest('USER_SIGNUP_SAGA', signUpSaga);
}


// Đăng Nhập
function* signinSaga(action) {
    console.log(action);

    yield put({
        type: 'DISPLAY_LOADING'
    })
    yield delay(500);

    // Gọi Api
    try {
        const { data, status } = yield CyberbugsService.signinCyberBugs(action.userLogin);
        // Lưu vào Localstore
        localStorage.setItem(TOKEN1, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: USLOGIN,
            userLogin: data.userLogin
        })
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/');
        // console.log(data);

    } catch (er) {
        console.log(er.response.data);
    }
    yield put({
        type: 'HIDE_LOADING'
    })
}

export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_SAGA, signinSaga);
}

// QUẩn Lý action Sagga
function* getUserSaga(action) {


    // Gọi Api
    try {
        const { data, status } = yield call(() => CyberbugsService.getUserProject(action.keyWord));
        console.log('data', data);
        // console.log(status);
        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })




    } catch (er) {
        console.log(er.response.data);
    }

}

export function* theoDoGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);
}

// Add Project
function* addUserProjectSaga(action) {


    // Gọi Api
    console.log(action.userProject);
    try {
        const { data, status } = yield call(() => CyberbugsService.asignUserProject(action.userProject));
        console.log(status);
     

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })





    } catch (er) {
        console.log(er.response.data);
    }

}

export function* theoDoiAddUserProject() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);
}

//  Remove Project

function* removeUserProjectSaga(action) {


    // Gọi Api
    console.log(action.userProject);
    try {
        const { data, status } = yield call(() => CyberbugsService.removeUserFromProject(action.userProject));
        console.log(status);

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })





    } catch (er) {
        console.log(er.response.data);
    }

}

export function* theoDoiRemoveUserProject() {
    yield takeLatest('REMOVE_USER_PROJECT_API', removeUserProjectSaga);
}

// GetUsserByProject
function* getUserByProjectSaga(action) {

    const { idProject } = action;
    // Gọi Api

    try {
        const { data, status } = yield call(() => CyberbugsService.getUserByProjectId(action.idProject));
        console.log(status);

        yield put({
            type: 'GET_USER_BY_PROJECT_ID',
            arrUser: data.content
        })





    } catch (er) {
        console.log(er.response?.data);
        if(er.response?.data.stateCode === STATUS_CODE.NOT_FOUND){
            yield put({
                type: 'GET_USER_BY_PROJECT_ID',
                arrUser: []
            })
        }
    }

}

export function* theoDoigetUserByProjectSaga() {
    yield takeLatest('GET_USER_BY_PROJECT_ID_SAGA', getUserByProjectSaga);
}

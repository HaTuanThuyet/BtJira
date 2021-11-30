import Axios from 'axios'
import { fork, take, call, delay, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { CyberbugsService } from '../../Pages/Services/CyberbugsService';
import { TOKEN, TOKEN1, USER_LOGIN } from '../../util/constants/settingSystem';
import { USER_SIGNIN_SAGA, USLOGIN } from '../constants/Cyberbugs';





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
        history.push('/cyberbugs');
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
        // console.log('data', data);
        // console.log(status);
        yield put({
            type:'GET_USER_SEARCH',
            lstUserSearch:data.content
        })




    } catch (er) {
        console.log(er.response.data);
    }

}

export function* theoDoGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);
}

// 
function* addUserProjectSaga(action) {


    // Gọi Api
    console.log(action.userProject);
    try {
        const { data, status } = yield call(() => CyberbugsService.asignUserProject(action.userProject));
        console.log(status);
        // em bị lỗi phần này action e clg ra có nhưng e post lên lại api thì k được
        // e k pk bị lỗi sao e gữi tham số lên đúng yêu cầu trên api nhưng lại k đủ quyền truy cập,k pk e thiếu gì k nữa!!!
      
        yield put({
            type:'GET_LIST_PROJECT_SAGA'
        })
          




    } catch (er) {
        console.log(er.response.data);
    }

}

export function* theoDoiAddUserProject() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);
}


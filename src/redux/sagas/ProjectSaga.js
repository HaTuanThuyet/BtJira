import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { CyberbugsService } from "../../Pages/Services/CyberbugsService";
import { STATUS_CODE } from "../../util/constants/settingSystem";

import { select } from 'redux-saga/effects'
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";





function* createProjectSaga(action) {
    console.log("actioncreateProject", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() =>
            CyberbugsService.createProject(action.newProject));
        console.log('data', data);

        if (status = STATUS_CODE.SUCCESS) {
            console.log(data);

            // history.push('/projectmanagement');
            let history = yield select(state => state.HistoryReducer.history)
            history.push('/projectmanagement');

        }
        yield put({
            type: 'HIDE_LOADING'
        })

    } catch (error) {
        console.log(error);

    }
    yield put({
        type: 'HIDE_LOADING'
    })







}


export function* theoDoicreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}
// -----GetAllProject----

function* getListProjectSaga(action) {
    console.log("actioncreateProject", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() =>
            CyberbugsService.getListProjectSaga1());
        console.log('data', data.content);
        console.log(status);
        yield put({
            type: 'GET_LIST_PROJECT',
            projectList: data.content
        });



        if (status = STATUS_CODE.SUCCESS) {

            // lẤY DỮ LIỆU TỪ API VỀ PUT LÊN UI



        }


    } catch (error) {
        console.log(error);

    }
    yield put({
        type: 'HIDE_LOADING'
    })







}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_ALL_PROJECT_SAGE', getListProjectSaga);
}

//-----UpdateProject-------

function* updateProject(action) {
    console.log("actionupdate", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() =>
            CyberbugsService.updateProject(action.projectUpdate));


        yield call(getListProjectSaga)

        yield put({
            type: 'CLOSE_DRAWER'
        })




    } catch (error) {
        console.log(error);

    }
    yield put({
        type: 'HIDE_LOADING'
    })

}
export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProject);
}


// ------DeleteProject-----

function* deleteProject(action) {
    console.log("actionupdate", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() => CyberbugsService.deleteProject(action.idProject));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete Project Successfully !')
        } else {
            notifiFunction('error', 'Delete Project fail !')
        }

        yield call(getListProjectSaga)

        yield put({
            type: 'CLOSE_DRAWER'
        })




    } catch (error) {
        console.log(error);
        notifiFunction('error', 'Delete Project fail !');

    }
    yield put({
        type: 'HIDE_LOADING'
    })

}
export function* theoDoiDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProject);
}





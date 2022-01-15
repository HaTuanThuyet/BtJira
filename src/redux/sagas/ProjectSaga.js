import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { CyberbugsService } from "../../Pages/Services/CyberbugsService";
import { STATUS_CODE } from "../../util/constants/settingSystem";

import { select } from 'redux-saga/effects'
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";
import { number } from "yup/lib/locale";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../constants/ProjectConstants";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/PriorityConstants";
import { PriorityService } from "../../Pages/Services/PriorityService";





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

        // if (status = STATUS_CODE.SUCCESS) {
            console.log(data);

            // history.push('/projectmanagement');
            // let history = yield select(state => state.HistoryReducer.history)
            // history.push('/projectmanagement');

        // }
        // let history = yield select(state => state.HistoryReducer.history)
        // history.push('/projectmanagement');
        yield put({
            type: 'HIDE_LOADING'
        })
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/projectmanagement');

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

// Theo Doi GetProjectDetail
function* getProjectDetailSaga(action) {
    // console.log("actionupdate", action.projectId);
    const {projectId} = action;
    console.log(projectId);

    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {
        const { data, status } = yield call(() => CyberbugsService.getProjectDetail(action.projectId.projectId));
        console.log(data);
        console.log(status);
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })


    } catch (error) {

        console.log(error.response.data);
        // History.push('/projectmanagement');

    }
    yield put({
        type: 'HIDE_LOADING'
    })
}
export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);
}

// GetAllProject
function* getProjectAllSaga(action) {
    // console.log("actionupdate", action.projectId);

    // Hiển thị
    // yield put({
    //     type: "DISPLAY_LOADING"
    // })
    yield delay(500);

    try {
        const { data, status } = yield call(() => CyberbugsService.getAllDetail());
        console.log(data);
        console.log(status);
        yield put({
            type: GET_ALL_PROJECT,
            arrrProject: data.content
        })
        yield put({
            type: 'GET_USER_BY_PROJECT_ID_SAGA',
            idProject: data.content[0]?.id
        })

    } catch (error) {

        console.log(error.response.data);
        // History.push('/projectmanagement');

    }
    yield put({
        type: 'HIDE_LOADING'
    })
}
export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}

















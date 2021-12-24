import { call, put, takeLatest,delay } from "@redux-saga/core/effects"
import { CyberbugsService } from "../../Pages/Services/CyberbugsService";
import { PriorityService } from "../../Pages/Services/PriorityService";
import { TaskTypeService } from "../../Pages/Services/TaskTypeService";
import { UsersService } from "../../Pages/Services/UserSevices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/PriorityConstants";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConstants";
// -----GetAllProject----

function* getListUserSaga(action) {
    console.log("actioncreateProject", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() =>
            CyberbugsService.getListUserSaga());
        console.log('data', data.content);
        console.log(status);
        yield put({
            type: 'GET_LIST_USERS',
            UserList: data.content
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

export function* theoDoiGetListUserSaga() {
    yield takeLatest('GET_ALL_USERS_SAGE', getListUserSaga);
}

//-----UpdateUser-------

function* updateUser(action) {
    console.log("actionupdate", action)
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() =>
        UsersService.UpdateUserSaga(action.usersUpdate));


        yield call(getListUserSaga)

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
export function* theoDoiUpdateUserSaga() {
    yield takeLatest('UPDATE_USERS_SAGA', updateUser);
}


// deleteusser

function* deleteUser(action) {
    console.log("deleteusser123", action);
    const id = action;
    // Hiển thị
    yield put({
        type: "DISPLAY_LOADING"
    })
    yield delay(500);

    try {

        const { data, status } = yield call(() => UsersService.deleteUser(id));
        console.log(status);
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete Users Successfully !')
        } else {
            notifiFunction('error', 'Delete Users fail !')
        }

        yield call(getListUserSaga)

        yield put({
            type: 'CLOSE_DRAWER'
        })




    } catch (error) {
        console.log(error);
        notifiFunction('error', 'Delete Users fail !');

    }
    yield put({
        type: 'HIDE_LOADING'
    })

}
export function* theoDoiDeleteUserSaga() {
    yield takeLatest('DELETE_USERS_SAGA', deleteUser);
}





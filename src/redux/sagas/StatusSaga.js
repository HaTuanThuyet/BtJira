import { call, put, takeLatest } from "@redux-saga/core/effects"
import { PriorityService } from "../../Pages/Services/PriorityService";
import { StatusService } from "../../Pages/Services/StatusService";
import { TaskTypeService } from "../../Pages/Services/TaskTypeService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/PriorityConstants";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../constants/StatusConstants";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConstants";

function * getAllSatusSaga(){
    try{
        const { data, status } = yield call(() => StatusService.getAllStatus());
        console.log('dataStatus',data);
        console.log('status',status);


        yield put ({
            type:GET_ALL_STATUS,
            arrStatus:data.content
        })

    }catch(err){
        console.log(err)
    }
}

export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllSatusSaga);
}




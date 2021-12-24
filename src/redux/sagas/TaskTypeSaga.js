import { call, put, takeLatest } from "@redux-saga/core/effects"
import { TaskTypeService } from "../../Pages/Services/TaskTypeService";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConstants";

function * getAllTaskTypeSaga(action){
    try{
        const { data, status } = yield call(() => TaskTypeService.getAllTaskType());

        yield put ({
            type:GET_ALL_TASK_TYPE,
            arrTaskType:data.content
        })

    }catch(err){
        console.log(err)
    }
}

export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}

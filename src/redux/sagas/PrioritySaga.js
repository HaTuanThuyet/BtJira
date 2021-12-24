import { call, put, takeLatest } from "@redux-saga/core/effects"
import { PriorityService } from "../../Pages/Services/PriorityService";
import { TaskTypeService } from "../../Pages/Services/TaskTypeService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/PriorityConstants";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConstants";

function * getAllPrioritySaga(){
    try{
        const { data, status } = yield call(() => PriorityService.getAllPriority());
        console.log('dataPriority',data);
        console.log('status',status);


        yield put ({
            type:GET_ALL_PRIORITY,
            arrPriority:data.content
        })

    }catch(err){
        console.log(err)
    }
}

export function* theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}


// function * createTaskSaga(action){
//     console.log(action)
//     try{
//         const action = yield call(() => PriorityService.createTask(action.taskObject));
    

       

//     }catch(err){
//         console.log(err.response.data)
//     }
// }

// export function* theoDoiCreateTaskSaga() {
//     yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);
// }


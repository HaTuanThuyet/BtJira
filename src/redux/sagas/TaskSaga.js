import { call, put, takeLatest, select } from "@redux-saga/core/effects"
import { TaskTypeService } from "../../Pages/Services/TaskTypeService";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConstants";
import { notifiFunction } from '../../util/Notification/notificationCyberbugs'
import { TaskService } from "../../Pages/Services/TaskService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { PriorityService } from "../../Pages/Services/PriorityService";
import { Select } from "antd";
// const {projectDetail} = useSelector(state => state.ProjectReducer);
// const dispatch = useDispatch();
// console.log('projectDetail',projectDetail);
// useEffect(() => {
//     const projectId = props.match.params;
//     dispatch({
//         type:'GET_PROJECT_DETAIL',
//         projectId
//     })
// },[])

function* createTaskSaga(action) {
    console.log('actiontask', action.taskObject);
    try {
        const { data, status } = yield call(() => TaskService.createTask(action?.taskObject));
        console.log('data', data);
    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);
}
// GET_TASK_DETAIL_SAGA

function* getTaskDetailSaga(action) {
    const { taskId } = action;
    try {
        const { data, status } = yield call(() => TaskService.getTaskDetail(action?.taskId));
        console.log('dataGetTassk', data)
        yield put({
            type: 'GET_TASK_DETAIL',
            taskDetailModel: data.content
        })
    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest('GET_TASK_DETAIL_SAGA', getTaskDetailSaga);
}

// UpdatesTatus Task
function* updateTaskStatusSaga(action) {
    const { taskStatusUpdate } = action;
    console.log(action);
    try {
        const { data, status } = yield call(() => TaskService.updateStatusTask(taskStatusUpdate));
        console.log('dataUpdateTassk', data)
        yield put({
            type: 'GET_PROJECT_DETAIL',
            projectId: taskStatusUpdate.projectId,

        })
        yield put({
            type: 'GET_TASK_DETAIL_SAGA',
            taskId: taskStatusUpdate.taskId,

        })
        let history = yield select(state => state.HistoryReducer.history)
        history.push(`/projectdetail/${taskStatusUpdate.projectId}`);
    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest('UPDATE_TASK_STATUS_SAGA', updateTaskStatusSaga);
}
// GET COMMENT
function* getAllComent() {

    console.log();
    try {
        const { data, status } = yield call(() => TaskService.getcomentTask());
        console.log('datagetAll', data)
        yield put({
            type: 'UPDATE_COMMENT',
            content: data.content

        })
        yield put({
            type: 'GET_TASK_DETAIL',
            taskDetailModel: data.content

        })


    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoigetAllComent() {
    yield takeLatest('GET_ALL_COMMENT_SAGA', getAllComent);
}
function* deleteComent(action) {

    console.log(action);
    try {
        const { data, status } = yield call(() => TaskService.deletecomentTask(action.idComment));
        console.log('DELETE', data.content)
    
        yield put({
            type: 'GET_TASK_DETAIL',
            taskDetailModel: data.content

        })
        yield put({
            type: 'GET_TASK_DETAIL_SAGA',
            taskId: data.taskId

        })
        yield put({
            type: 'UPDATE_COMMENT',
            content: data.content

        })

    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoideleteComent() {
    yield takeLatest('DELETE_COMMET_PROJECT_SAGA', deleteComent);
}

function* commentTaskSaga(action) {
    const { taskCommentUpdate } = action;
    console.log('taskCommentUpdate', taskCommentUpdate);
    try {
        const { data, status } = yield call(() => TaskService.commentTask(action?.taskCommentUpdate));
        console.log('taskCommentUpdatesucsess', data)
        yield put({
            type: 'GET_TASK_DETAIL',
            taskDetailModel: data.content.contentComment

        })
        yield put({
            type: 'GET_TASK_DETAIL_SAGA',
            taskId: data.taskId

        })
        yield put({
            type: 'UPDATE_COMMENT',
            content: data.content

        })
        yield put({
            type: 'COMMMENT',
            taskDetailModel: data.content
        })
        yield put({
            type: 'CLOSE_DRAWER'
        })
        let history = yield select(state => state.HistoryReducer.history)
        // history.push(`/projectdetail/${taskDetailModel.projectId}`);
    } catch (er) {
        console.log(er.response.data)
    }
}
export function* theoDoicommentTaskSaga() {
    yield takeLatest('UPDATE_COMMENT_SAGA', commentTaskSaga);
}


// 
function* handleChangePostApi(action) {

    console.log('acac', action)
    switch (action.actionType) {
        case 'CHANGE_TASK_DETAIL': {
            const { value, name } = action;
            yield put({
                type: 'CHANGE_TASK_DETAIL',
                name,
                value
            });
        };
            break;
        case 'CHANGE_ASSIGNNESS': {
            const { userSelect } = action;
            yield put({
                type: 'CHANGE_ASSIGNNESS',
                userSelect
            });
        };
            break;
        case 'REMOVE_USER_ASSIGNESS': {
            const { userId } = action;
            yield put({
                type: 'REMOVE_USER_ASSIGNESS',
                userId
            });
        };
            break;
        default: { break }

    }
    let { taskDetailModel } = yield select(state => state.TaskReducer);
    console.log('taskDetailModel sau khi bieens ddoooxi', taskDetailModel)
    const listUserAsign = taskDetailModel.assigness?.map((user, index) => {
        return user.id;
    });
    const tastUpdateApi = { ...taskDetailModel, listUserAsign };
    try {
        const { data, status } = yield call(() => TaskService.updateTask(tastUpdateApi));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: tastUpdateApi.projectId,

            })
            yield put({
                type: 'GET_TASK_DETAIL_SAGA',
                taskId: tastUpdateApi.taskId,

            })
            // let history = yield select(state => state.HistoryReducer.history)
            // history.push('/projectdetail');
        }
    } catch (er) {
        console.log(er.response.data)
    }


}
export function* theoDoiHandleChangePostApi() {
    yield takeLatest('HANDLE_CHANGE_POST_API', handleChangePostApi);

}











const initialState = {
    taskDetailModel: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 827,
                "avatar": "https://ui-avatars.com/api/?name=Tien Do13213",
                "name": "Tien Do13213",
                "alias": "tien-do"
            },
            {
                "id": 972,
                "avatar": "https://ui-avatars.com/api/?name=Thong",
                "name": "Thong",
                "alias": "thong"
            }
        ],
        "lstComment": [

        ],
        "taskId": 2122,
        "taskName": "test",
        "alias": "test",
        "description": "<p>test</p>",
        "statusId": "1",
        "originalEstimate": 1,
        "timeTrackingSpent": 1,
        "timeTrackingRemaining": 1,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 2440

    }

}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TASK_DETAIL': {


            return { ...state, taskDetailModel: action.taskDetailModel };
        }
        case 'CHANGE_TASK_DETAIL': {
            console.log('StateTasskDetail', state.taskDetailModel)
            const { name, value } = action;
            return {
                ...state, taskDetailModel: {
                    ...state.taskDetailModel,
                    [name]: value
                }
            };
        }
        case 'CHANGE_ASSIGNNESS': {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness, action.userSelect]
            return { ...state };
        }
        case 'REMOVE_USER_ASSIGNESS': {
            state.taskDetailModel.assigness = [...state.taskDetailModel.assigness.filter(us => us.id !== action.userId)]
            return { ...state };
        }
      



        default:
            return { ...state }
    }
}

const initialState = {
    content: [
        {
            "user": {
                "userId": 1038,
                "name": "Thuyết",
                "avatar": "https://ui-avatars.com/api/?name=Thuyết"
            },
            "id": 2396,
            "userId": 1038,
            "taskId": 2174,
            "contentComment": "hello",
            "deleted": false,
            "alias": "hello"
        },
    ]
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE_COMMENT': {
            state.content = action.content

            console.log(state.content);
            return { ...state };

        }
        case 'COMMMENT': {


            state.content = action.taskDetailModel
            return { ...state };

        }

        default:
            return { ...state }
    }
}

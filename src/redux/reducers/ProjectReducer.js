const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "string"
    },
    UserList: {
        "id": 0,
        "name": "string",
        "email": 0,
        "phoneNumber": "string",
      
    },
    projectDetail: {}
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_PROJECT": {
            state.projectEdit = action.projectEditModel;
            return { ...state }

        }
        case 'PUT_PROJECT_DETAIL':{
            state.projectDetail = action.projectDetail
            return {...state}
        }
        case "EDIT_USSER": {
            state.UserList = action.UserList;
            return { ...state }

        }



        default:
            return { ...state }
    }
}

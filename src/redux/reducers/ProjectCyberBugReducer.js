const stateDefault = {
    projectList:[
        {id:'2',projectName:'Thuyet',category:"",creator:""}
    ],
    UserList:[
        {userId:'2',name:'Thuyet',phoneNumber:"",email:""}
    ],
    arrrProject:[]
}

export const ProjectCyberBugReducer = (state= stateDefault , action)=>{

    switch(action.type){
        case 'GET_LIST_PROJECT':{
           state.projectList=action.projectList;
           console.log('projectList',state.projectList);
           return {...state};
        }
        case 'GET_ALL_PROJECT':{
            state.arrrProject = action.arrrProject;
            return {...state}
        }
        case 'GET_LIST_USERS':{
            state.UserList=action.UserList;
            console.log('UserList',state.UserList);
            return {...state};
         }
          
         

        default: return{...state}
    }

}
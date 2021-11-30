const stateDefault = {
    projectList:[
        {id:'2',projectName:'Thuyet',category:"",creator:""}
    ]
}

export const ProjectCyberBugReducer = (state= stateDefault , action)=>{

    switch(action.type){
        case 'GET_LIST_PROJECT':{
           state.projectList=action.projectList;
           console.log('projectList',state.projectList);
           return {...state};
          
         

        }
        default: return{...state}
    }

}
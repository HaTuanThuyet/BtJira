import React from "react"

const initialState = {
    visible: false,
    title:'',
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit:()=>{
        alert('Click demo')
    }
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'OPEN_DRAWER':{
        return {...state,visible:true}
    }
    case 'CLOSE_DRAWER':{
        return {...state,visible:false}
    }
    case 'OPEN_FORM_PROJECT':{
        state.title=action.title;
        console.log(state.title)
        return {...state,visible:true,
            ComponentContentDrawer:action.Component}
    }
    case 'SET_SUBMIT_EDIT_PROJECT':{
        state.callBackSubmit =action.submitFunction
        return {...state}
    }
    case 'SET_SUBMIT_EDIT_USERS':{
        state.callBackSubmit =action.submitFunction
        return {...state}
    }
    case 'SET_SUBMIT_CREATE_TASK':{
        state.callBackSubmit =action.submitFunction
        return {...state}
    }
    case 'OPEN_FORM_CREATE_TASK':{
        state.visible = true ;
        state.title =action.title;
        state.ComponentContentDrawer = action.ComponentContentDrawer;
     
        return {...state}
    }
      

    default: return{...state}
}
    
}

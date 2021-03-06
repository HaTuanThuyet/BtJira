import { applyMiddleware, combineReducers, createStore } from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer';
// middlewareSaga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
import LoadingReducer from './reducers/LoadingReducer';
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer"
import { HistoryReducer } from './reducers/HistoryReducer'
import { UserLoginCyberReducer } from './reducers/UserCyberbugsReducer'
import { ProjectCyberBugReducer } from './reducers/ProjectCyberBugReducer';
import { drawerReducer } from './reducers/DrawerCyberbugs';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';
import { CommentReducer } from './reducers/CommentReducer';
const MiddleWareSaga = createMiddleWareSaga();




const rootReducer = combineReducers({
    // Khai Báo reducer
    ToDoListReducer,
    ProjectCategoryReducer,
    LoadingReducer,
    HistoryReducer,
    UserLoginCyberReducer,
    ProjectCyberBugReducer,
    drawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer,


})


const store = createStore(rootReducer, applyMiddleware(MiddleWareSaga));
MiddleWareSaga.run(rootSaga);


export default store
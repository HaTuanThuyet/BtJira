import { applyMiddleware, combineReducers, createStore } from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer';
// middlewareSaga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
import LoadingReducer from './reducers/LoadingReducer';
import {ProjectCategoryReducer} from "./reducers/ProjectCategoryReducer"
import {HistoryReducer} from'./reducers/HistoryReducer'
import {UserLoginCyberReducer} from './reducers/UserCyberbugsReducer'
import { ProjectCyberBugReducer } from './reducers/ProjectCyberBugReducer';
import { drawerReducer } from './reducers/DrawerCyberbugs';
import { ProjectReducer } from './reducers/ProjectReducer';
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
   ProjectReducer


})


const store = createStore(rootReducer,applyMiddleware(MiddleWareSaga));
MiddleWareSaga.run(rootSaga);


export default store
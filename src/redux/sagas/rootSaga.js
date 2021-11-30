import {fork,take,all} from 'redux-saga/effects'
import * as Cyberbugs from './UserCyberbugsSaga'
import * as ProjectCategorySaga from '../actions/ProjectCategorySaga'
import * as ProjectSaga from'./ProjectSaga'

export function * rootSaga () {
    
    yield all(
        [
            Cyberbugs.theoDoiSignin(),
            Cyberbugs.theoDoGetUser(),
            Cyberbugs.theoDoiAddUserProject(),
            ProjectCategorySaga.theoDoigetAllProjectCategory(),
            ProjectSaga.theoDoicreateProjectSaga(),
            ProjectSaga.theoDoiGetListProjectSaga(),
            ProjectSaga.theoDoiUpdateProjectSaga(),
            ProjectSaga.theoDoiDeleteProjectSaga(),
          


           


            

            
        ])
 



}
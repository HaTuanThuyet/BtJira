import { fork, take, all } from 'redux-saga/effects'
import * as Cyberbugs from './UserCyberbugsSaga'
import * as ProjectCategorySaga from '../actions/ProjectCategorySaga'
import * as ProjectSaga from './ProjectSaga'
import * as TaskTypeSaga from './TaskTypeSaga'
import * as PrioritySaga from './PrioritySaga'
import * as CreateTaskSaga from './TaskSaga'
import * as StatusSaga from './StatusSaga'
import * as UserSaga from './UserSaga'






export function* rootSaga() {

    yield all(
        [
            Cyberbugs.theoDoiSignin(),
            Cyberbugs.theoDoiSignUp(),

            Cyberbugs.theoDoGetUser(),
            Cyberbugs.theoDoiAddUserProject(),
            Cyberbugs.theoDoiRemoveUserProject(),
            Cyberbugs.theoDoigetUserByProjectSaga(),
            UserSaga.theoDoiGetListUserSaga(),
            UserSaga.theoDoiUpdateUserSaga(),
            UserSaga.theoDoiDeleteUserSaga(),





            ProjectCategorySaga.theoDoigetAllProjectCategory(),
            ProjectSaga.theoDoicreateProjectSaga(),
            ProjectSaga.theoDoiGetListProjectSaga(),
            ProjectSaga.theoDoiUpdateProjectSaga(),
            ProjectSaga.theoDoiDeleteProjectSaga(),
            ProjectSaga.theoDoiGetProjectDetail(),
            ProjectSaga.theoDoiGetAllProjectSaga(),
            TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
            PrioritySaga.theoDoiGetAllPrioritySaga(),
            CreateTaskSaga.theoDoiCreateTaskSaga(),
            CreateTaskSaga.theoDoiGetTaskDetailSaga(),
            CreateTaskSaga.theoDoiUpdateTaskStatusSaga(),
            // CreateTaskSaga.theoDoiUpdateTaskSaga(),
            CreateTaskSaga.theoDoiHandleChangePostApi(),


            StatusSaga.theoDoiGetAllStatusSaga(),



        ])


}










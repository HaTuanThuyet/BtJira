import { call, put, takeLatest } from "@redux-saga/core/effects";
import { CyberbugsService } from "../../Pages/Services/CyberbugsService";



function* getAllProjectCategory(action) {

    try {
        console.log(action)
        // Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => CyberbugsService.getAllProjectCategory());
        console.log('data',data)
        // Dispatch lên ruducer
        yield put({
            type: 'GET_ALL_PROJECT_CATEGORY',
            data: data.content
        })
    } catch (error) {
        console.log(error.response.data);
    }



}


export function* theoDoigetAllProjectCategory() {
    yield takeLatest('GET_ALL_PROJECT_CATEGORY_SAGA', getAllProjectCategory);
}
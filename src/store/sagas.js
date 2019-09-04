import { takeEvery, put } from 'redux-saga/effects';
import { GET_LIST_BY_SAGA } from './actionTypes';
import axios from 'axios';
import { getListAction } from './actionCreators';

function* mySagas() {
    yield takeEvery(GET_LIST_BY_SAGA, getList);
};

function* getList() {
    const resp = yield axios.post('https://www.easy-mock.com/mock/5d68e07d0c885f74263b5035/react16-demo/upload');
    const action = getListAction(resp.data.data.list);
    yield put(action);
};

export default mySagas;

import { all } from 'redux-saga/effects';
import { authSaga } from './slice/auth/saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}

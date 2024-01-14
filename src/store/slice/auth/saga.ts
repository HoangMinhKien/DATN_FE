import { authActions } from '.';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from 'utils/http/request';
import { checkDeviceId } from 'utils/helpers/checkDeviceId';
import { getCookie } from 'utils/helpers/getCookie';
import History from 'app/components/History/History';
import { getLocalStorage } from 'utils/storage/local';

export function* handleLogin(
  action: PayloadAction<{ username: string; password: string }>,
) {
  yield call(checkDeviceId);
  const { device_id, session_info } = yield call(
    getCookie,
    'device_id_talkhub',
  );
  const response = yield call(
    apiPost,
    `/ez/v1/login?device_id=${device_id}&session_info=${session_info}`,
    {
      username: action.payload.username,
      password: action.payload.password,
    },
    {},
  );
  const { error, data, message } = response;
  console.log(response);
  if (error === 0) {
    yield put(
      authActions.loginSuccess({
        id: data.id,
        token: data.token,
        nick_name: data.nick_name,
        avatar: data.avatar,
        username: data.username,
        refreshToken: data.refreshToken,
        token_time: data.token_exp_time,
      }),
    );
    yield History.push('/home/news');
  } else if (error === 11 || error === 10) {
    yield put(
      authActions.loginFail({
        error: error,
        message: message,
      }),
    );
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleLogout() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(
    apiPost,
    `/ez/v1/logout`,
    {},
    {
      userid: id,
      token: token,
    },
  );
  const { error } = response;
  if (error === 0) {
    yield put(authActions.logoutSucces());
  } else {
    yield put(authActions.setLoading(false));
  }
}
export function* handleRegister(
  action: PayloadAction<{ username: string; password: string }>,
) {
  yield call(checkDeviceId);
  const { device_id, session_info } = yield call(
    getCookie,
    'device_id_talkhub',
  );
  const response = yield call(
    apiPost,
    `/ez/v1/register?device_id=${device_id}&session_info=${session_info}`,
    {
      username: action.payload.username,
      password: action.payload.password,
    },
    {},
  );
  const { error, data, message } = response;
  console.log(response);
  if (error === 0) {
    yield put(
      authActions.registerSuccess({
        id: data.id,
        token: data.token,
        nick_name: data.nick_name,
        avatar: data.avatar,
        username: data.username,
        refreshToken: data.refreshToken,
        token_time: data.token_exp_time,
      }),
    );
    yield History.push('/home/news');
  } else if (error === 12) {
    yield put(
      authActions.registerFail({
        error: error,
        message: message,
      }),
    );
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicsAll(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const { page } = action.payload;
  const response = yield call(apiGet, `/ez/v1/topic/getall?page=${page}`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicsAll(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicWithCategory(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const { page, categoryId } = action.payload;
  const response = yield call(
    apiGet,
    `/ez/v1/topic/getbycategory?categoryid=${categoryId}&page=${page}`,
    {
      userid: id,
      token: token,
    },
  );
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicWidthCategory(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicNews() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiGet, `/ez/v1/topic/getlatest`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicNews(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicPopular() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiGet, `/ez/v1/topic/getpopular`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicPopular(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicMe() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiGet, `/ez/v1/topic/getmytopic`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  console.log(response);
  if (error === 0) {
    yield put(authActions.getTopicMe(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicSearch(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(
    apiGet,
    `/ez/v1/topic/filter?str=${action.payload.keyword}`,
    {
      userid: id,
      token: token,
    },
  );
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicSearch(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTags() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiGet, `/ez/v1/tag/getall`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(
      authActions.getTags({
        tags: data.tags,
      }),
    );
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleTopicTags(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const { tagname, page } = action.payload;
  const response = yield call(
    apiGet,
    `/ez/v1/topic/getbytag?tag=${tagname}&page=${page}`,
    {
      userid: id,
      token: token,
    },
  );
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.getTopicTag(data.topics));
  } else {
    yield put(authActions.setLoading(false));
  }
}

function* handleCreateTopic(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiPost, `/ez/v1/topic/create`, action.payload, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.createTopicSuccess(data));
    yield put(authActions.resetAvatarTopic());
    History.push('/home/news');
  } else {
    yield put(authActions.resetAvatarTopic());
  }
}

function* handleUpdateTopic(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiPost, `/ez/v1/topic/update`, action.payload, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  if (error === 0) {
    yield put(authActions.updateTopicSuccess(data));
    yield put(authActions.resetAvatarTopic());
    History.push('/home/mytopic');
  } else {
    yield put(authActions.resetAvatarTopic());
  }
}

function* handleGetDetailTopic(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const { topicId } = action.payload;
  const response = yield call(
    apiGet,
    `/ez/v1/topic/getbyid?topicid=${topicId}`,
    {
      userid: id,
      token: token,
    },
  );
  const { error, data } = response;
  console.log(response);
  if (error === 0) {
    yield put(authActions.getDetailTopicSuccess(data));
  } else {
    yield put(authActions.setLoading(false));
  }
}
// Create Comment
function* handleCreateComment(action) {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiPost, `/ez/v1/post/create`, action.payload, {
    userid: id,
    token: token,
  });
  const { error } = response;
  if (error === 0) {
    yield put(
      authActions.requestGetDetailTopic({
        topicId: action.payload.topicid,
      }),
    );
  }
}
//Notification
function* handleNotification() {
  const { id, token } = getLocalStorage('persist:talkhub', 'auth');
  const response = yield call(apiGet, `/ez/v1/noti/getall`, {
    userid: id,
    token: token,
  });
  const { error, data } = response;
  console.log(response);
  if (error === 0) {
    yield put(authActions.getNotification(data.noti));
  } else {
    yield put(authActions.setLoading(false));
  }
}
export function* authSaga() {
  yield takeLatest(authActions.requestLogin.type, handleLogin);
  yield takeLatest(authActions.requestLogout.type, handleLogout);
  yield takeLatest(authActions.requestRegister.type, handleRegister);
  yield takeLatest(authActions.requestTopicsAll.type, handleTopicsAll);
  yield takeLatest(
    authActions.requestTopicWithCategory.type,
    handleTopicWithCategory,
  );
  yield takeLatest(authActions.requestTopicNews.type, handleTopicNews);
  yield takeLatest(authActions.requestTopicPopular.type, handleTopicPopular);
  yield takeLatest(authActions.requestTopicMe.type, handleTopicMe);
  yield takeLatest(authActions.requestTopicSearch.type, handleTopicSearch);
  yield takeLatest(authActions.requestGetTags.type, handleTags);
  yield takeLatest(authActions.requestGetTopicTag.type, handleTopicTags);
  yield takeLatest(authActions.requestCreateTopic.type, handleCreateTopic);
  yield takeLatest(authActions.requestUpdateTopic.type, handleUpdateTopic);
  yield takeLatest(
    authActions.requestGetDetailTopic.type,
    handleGetDetailTopic,
  );
  yield takeLatest(authActions.requestCreateComment.type, handleCreateComment);
  yield takeLatest(authActions.requestNotification.type, handleNotification);
}

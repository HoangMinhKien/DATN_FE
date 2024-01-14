import {
  AuthState,
  ResponseState,
  LoginSuccess,
  TopicState,
  CreateTopicState,
  UpdateTopicState,
  CurrentTopic,
  Notification,
} from './type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: AuthState = {
  id: -1,
  token: '',
  avatar: '',
  username: '',
  nickName: '',
  email: '',
  phoneNumber: '',
  age: '',
  token_time: 0,
  refreshToken: '',
  isMobile: false,
  isLoading: false,
  isLogin: false,
  isError: false,
  response: {
    error: -1,
    message: '',
  },
  tags: [],
  topicsSearch: [],
  topcisAll: [],
  topicsCategory: [],
  topicsNews: [],
  topicsPopular: [],
  topicsMe: [],
  topicsTag: [],
  notification: [],
  categoryColor: ['#e83ddc', '#0088CC', '#F26B3A', '#f29f15', '#00ff0a'],
  topic: {
    title: '',
    img: [],
    tags: [],
    content: '',
    categoryid: -1,
  },
  topicEdit: {
    id: -1,
    title: '',
    img: '',
    tags: [],
    content: '',
    categoryid: -1,
  },
  currentTopic: {
    id: -1,
    categoryid: -1,
    userid: -1,
    title: '',
    content: '',
    create_time: -1,
    likes: -1,
    view: -1,
    img: [],
    post: -1,
    posts: [],
    topic_author_name: '',
    topic_author_avatar: '',
    marked: false,
    tags: [],
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestLogin(
      state: AuthState,
      action: PayloadAction<{ username: string; password: string }>,
    ) {
      state.isLoading = true;
    },
    loginSuccess(state: AuthState, action: PayloadAction<LoginSuccess>) {
      state.isLoading = false;
      state.isLogin = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.token_time = action.payload.token_time;
      state.refreshToken = action.payload.refreshToken;
      state.avatar = action.payload.avatar;
    },
    loginFail(state: AuthState, action: PayloadAction<ResponseState>) {
      state.isLoading = false;
      state.response = action.payload;
    },

    requestRegister(
      state: AuthState,
      action: PayloadAction<{ username: string; password: string }>,
    ) {
      state.isLoading = true;
    },
    registerSuccess(state: AuthState, action: PayloadAction<LoginSuccess>) {
      state.isLogin = true;
      state.isLoading = false;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.token_time = action.payload.token_time;
      state.refreshToken = action.payload.refreshToken;
    },
    registerFail(state: AuthState, action: PayloadAction<ResponseState>) {
      state.isLoading = false;
      state.response = action.payload;
    },
    resetResponse(state: AuthState) {
      state.response = {
        error: -1,
        message: '',
      };
    },

    setLoading(state: AuthState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    requestLogout(state: AuthState) {
      state.isLoading = true;
    },
    logoutSucces(state: AuthState) {
      return {
        ...initialState,
      };
    },
    //Get list topic
    requestTopicsAll(
      state: AuthState,
      action: PayloadAction<{
        page: number;
      }>,
    ) {
      state.isLoading = true;
    },

    getTopicsAll(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.isLoading = false;
      state.topcisAll = action.payload;
    },

    requestTopicWithCategory(
      state: AuthState,
      action: PayloadAction<{
        page: number;
        categoryId: number | string | undefined;
      }>,
    ) {
      state.isLoading = true;
    },

    getTopicWidthCategory(
      state: AuthState,
      action: PayloadAction<TopicState[]>,
    ) {
      state.isLoading = false;
      state.topicsCategory = action.payload;
    },

    requestTopicNews(state: AuthState) {
      state.isLoading = true;
    },

    getTopicNews(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.isLoading = false;
      state.topicsNews = action.payload;
    },

    requestTopicPopular(state: AuthState) {
      state.isLoading = true;
    },

    getTopicPopular(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.isLoading = false;
      state.topicsPopular = action.payload;
    },

    requestTopicMe(state: AuthState) {
      state.isLoading = true;
    },

    getTopicMe(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.isLoading = false;
      state.topicsMe = action.payload;
    },

    requestTopicSearch(
      state: AuthState,
      action: PayloadAction<{
        keyword: string;
      }>,
    ) {},

    getTopicSearch(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.topicsSearch = action.payload;
    },

    resetTopicsSear(state: AuthState) {
      state.topicsSearch = [];
    },

    requestGetTags(state: AuthState) {},

    getTags(
      state: AuthState,
      action: PayloadAction<{
        tags: {
          id: number;
          topicid: number;
          name: string;
        }[];
      }>,
    ) {
      state.tags = action.payload.tags;
    },

    requestGetTopicTag(
      state: AuthState,
      action: PayloadAction<{
        tagname: string | undefined;
        page: number;
      }>,
    ) {
      state.isLoading = true;
    },

    getTopicTag(state: AuthState, action: PayloadAction<TopicState[]>) {
      state.isLoading = false;
      state.topicsTag = action.payload;
    },

    setAvatarTopic(state: AuthState, action: PayloadAction<string>) {
      state.topic.img.push(action.payload);
    },
    resetAvatarTopic(state: AuthState) {
      state.topic.img = [];
    },
    // Create Topic
    createTitleTopic(
      state: AuthState,
      action: PayloadAction<{
        titleTopic: string;
      }>,
    ) {
      state.topic.title = action.payload.titleTopic;
    },

    requestCreateTopic(
      state: AuthState,
      action: PayloadAction<CreateTopicState>,
    ) {
      state.isLoading = true;
    },

    createTopicSuccess(
      state: AuthState,
      action: PayloadAction<CreateTopicState>,
    ) {
      state.isLoading = false;
      state.topic = action.payload;
    },

    requestUpdateTopic(
      state: AuthState,
      action: PayloadAction<UpdateTopicState>,
    ) {
      state.isLoading = true;
    },

    updateTopicSuccess(
      state: AuthState,
      action: PayloadAction<UpdateTopicState>,
    ) {
      state.isLoading = false;
      state.topicEdit = action.payload;
    },

    requestGetDetailTopic(
      state: AuthState,
      action: PayloadAction<{ topicId: number | string | undefined }>,
    ) {
      state.isLoading = true;
    },
    getDetailTopicSuccess(
      state: AuthState,
      action: PayloadAction<CurrentTopic>,
    ) {
      state.isLoading = false;
      state.currentTopic = action.payload;
    },
    setInfoUser(
      state: AuthState,
      action: PayloadAction<{
        nickName: string;
        age: string | number;
        avatar: string;
        email: string;
      }>,
    ) {
      state.nickName = action.payload.nickName;
      state.age = action.payload.age;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
    },
    requestError(state: AuthState) {
      state.isError = true;
    },
    // Create comment
    requestCreateComment(
      state: AuthState,
      action: PayloadAction<{
        topicid: number;
        content: string;
        img: string[];
      }>,
    ) {
      state.isLoading = true;
    },
    // notification
    requestNotification(state: AuthState) {
      state.isLoading = true;
    },

    getNotification(state: AuthState, action: PayloadAction<Notification[]>) {
      state.isLoading = false;
      state.notification = action.payload;
    },
  },
});

const { actions, reducer } = slice;
export const authActions = actions;
export const authReducer = reducer;

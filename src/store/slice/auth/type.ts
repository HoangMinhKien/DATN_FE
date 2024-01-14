export interface AuthState {
  id: number;
  token: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  token_time: number;
  refreshToken: string;
  age: string | number;
  nickName: string;
  username: string;
  isMobile: boolean;
  isLoading: boolean;
  isLogin: boolean;
  isError: boolean;
  response: ResponseState;
  topcisAll: TopicState[];
  topicsCategory: TopicState[];
  topicsNews: TopicState[];
  topicsPopular: TopicState[];
  topicsMe: TopicState[];
  topicsSearch: TopicState[];
  topicsTag: TopicState[];
  categoryColor: string[];
  topic: CreateTopicState;
  topicEdit: UpdateTopicState;
  tags: TagsState[];
  currentTopic: CurrentTopic;
  notification: Notification[];
}

export interface ResponseState {
  error: number;
  message: string;
}

export interface LoginSuccess {
  id: number;
  token: string;
  username: string;
  refreshToken: string;
  token_time: number;
  nick_name: string;
  avatar: string;
}

export interface TopicState {
  id: number;
  img: string;
  categoryid: number;
  userid: number;
  title: string;
  create_time: number;
  likes: number;
  view: number;
  post: number;
  tags: string[];
  author_name: string;
  author_avatar: string;
}

export interface CreateTopicState {
  title: string;
  content: string;
  img: string[];
  tags: string[];
  categoryid: number;
}

export interface UpdateTopicState {
  id: number;
  title: string;
  content: string;
  img: string;
  tags: string[];
  categoryid: number;
}

export interface TagsState {
  id: number;
  topicid: number;
  name: string;
}

export interface CurrentTopic {
  id: number;
  categoryid: number;
  userid: number;
  title: string;
  content: string;
  create_time: number;
  likes: number;
  view: number;
  img: string[];
  post: number;
  posts: PostState[];
  tags: string[];
  topic_author_name: string;
  topic_author_avatar: string;
  marked: boolean;
}

export interface PostState {
  id: string;
  userid: number;
  topicid: number;
  content: string;
  create_time: number;
  likes: number;
  post_user_avatar: string;
  post_user_name: string;
}

export interface Notification {
  id: number;
  userid: number;
  otherid: number;
  topicid: number;
  create_time: number;
  other_name: string;
  other_avatar: string;
  topic_title: string;
}

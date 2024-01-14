import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Flex,
  Stack,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDebouncedState } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { formatCreatTimeTopic } from 'utils/helpers/formatCreatTimeTopic';
import { ReactComponent as Search } from 'assets/icons/general/search.svg';
import { ReactComponent as Bell } from 'assets/icons/general/bell.svg';
import { ReactComponent as CaretDown } from 'assets/icons/arrow/caret-down.svg';
import { ReactComponent as Logout } from 'assets/icons/general/log-out.svg';
import { selectAuth } from 'store/slice/auth/selectors';
import { SubtleButton } from '../Button/SubtleButton';
import { authActions } from 'store/slice/auth';
import { images } from 'assets/images';
import Icon from '../Icon/Icon';
import { settingArray } from 'utils/arrays/settingArray';
import { apiGet } from 'utils/http/request';

const Wrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, topicsSearch, avatar, nickName, notification, id, token } =
    useSelector(selectAuth);

  const accountRef = useRef<HTMLDivElement | null>(null);
  const notiRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const [keyword, setKeyword] = useDebouncedState('', 200);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowNoti, setIsShowNoti] = useState<boolean>(false);
  const [countNoti, setCountNoti] = useState<number>(0);

  const hanldeLogout = () => {
    dispatch(authActions.requestLogout());
  };
  const handleSelectResult = (topicId: string | number) => {
    navigate(`/detail/${topicId}`);
    setKeyword('');
    dispatch(authActions.resetTopicsSear());
  };
  const handleNotification = () => {
    dispatch(authActions.requestNotification());
    setIsShowNoti(true);
  };
  useEffect(() => {
    if (keyword !== '') {
      dispatch(
        authActions.requestTopicSearch({
          keyword: keyword,
        }),
      );
    } else {
      dispatch(authActions.resetTopicsSear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  //get account noti
  const handleCountNoti = () => {
    apiGet(`/ez/v1/noti/count`, {
      userid: id,
      token: token,
    })
      .then(res => {
        console.log(res);
        if (res.error !== 0) {
          setCountNoti(0);
        } else {
          setCountNoti(res.data.count);
        }
      })
      .catch(err => console.log(err));
  };

  //set timeout
  const TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds

  const callApiWithTimeout = async () => {
    try {
      handleCountNoti();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(callApiWithTimeout, TIMEOUT);
    }
  };

  callApiWithTimeout();

  const handleSelectResultNoti = (topicId: string | number) => {
    navigate(`/detail/${topicId}`);
    setKeyword('');
    dispatch(authActions.resetTopicsSear());
    setIsShowNoti(false);
  };

  const closeNoti = () => {
    setIsShowNoti(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };
    setIsShowNoti(false);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);
  return (
    <Stack className={classes.container}>
      <div className={classes.wrapper}>
        <Flex className={classes.header} classNames="header">
          <Flex
            className={classes.headerLeft}
            onClick={() => navigate('/home/news')}
          >
            <Avatar src={images.logo} className={classes.logo} />
            <Text className={classes.banner}>TechTalk</Text>
          </Flex>
          <Flex className={classes.headerCenter}>
            <TextInput
              placeholder={t('Home.Nhập vào đây để tìm kiếm...')}
              classNames={{
                input: cx('body_4-bold', classes.inputSearch),
                root: classes.rootInput,
              }}
              value={keyword}
              onChange={event => setKeyword(event.currentTarget.value)}
            />
            <SubtleButton>
              <Icon icon={Search} large={24} color="var(--white)" />
            </SubtleButton>
            {topicsSearch.length !== 0 && (
              <div
                className={classes.resultSearch}
                onMouseLeave={event => setKeyword('')}
              >
                <Stack className={classes.resulteWrapper}>
                  {topicsSearch.map((item, index) => (
                    <Flex
                      key={index}
                      className={classes.searchItem}
                      onClick={() => handleSelectResult(item.id)}
                    >
                      <Avatar src={item.author_avatar} />
                      <div>
                        <Text
                          lineClamp={2}
                          className={cx('body_2-semibold', classes.searchName)}
                        >
                          {item.title}
                        </Text>
                        <Text
                          className={cx('small_2-semibold', classes.author)}
                        >
                          {item.author_name}
                        </Text>
                      </div>
                    </Flex>
                  ))}
                </Stack>
              </div>
            )}
          </Flex>
          <Flex ref={notiRef} className={classes.headerRight}>
            <div
              className={classes.bellWrap}
              onClick={() => handleNotification()}
            >
              {countNoti !== 0 && (
                <Text className={classes.notiCount}> {countNoti} </Text>
              )}
              <Icon icon={Bell} large={25}></Icon>
            </div>

            <Flex
              ref={accountRef}
              className={classes.headerUser}
              onClick={() => setIsShow(prev => !prev)}
            >
              <div className={classes.avatarWrap}>
                <Avatar src={avatar} />
              </div>
              <Text className={cx('body_4-bold', classes.username)}>
                {nickName || username}
              </Text>
              <Icon icon={CaretDown} large={12} />
              {isShow && (
                <div className={classes.accountWrap}>
                  <Stack className={classes.accountOptions}>
                    {settingArray.map((setting, index) => (
                      <Flex
                        key={index}
                        className={classes.accountOption}
                        onClick={() => navigate(setting.navigate)}
                      >
                        <Icon icon={setting.icon} large={24} />
                        <Text className={classes.accountText}>
                          {t(`Home.${setting.name}`)}
                        </Text>
                      </Flex>
                    ))}
                    <Flex
                      className={classes.accountOption}
                      onClick={hanldeLogout}
                    >
                      <Icon icon={Logout} large={24} />
                      <Text className={classes.accountText}>
                        {t('Home.Đăng xuất')}
                      </Text>
                    </Flex>
                  </Stack>
                </div>
              )}
            </Flex>
          </Flex>
          {isShowNoti && (
            <div className={classes.noti}>
              <Stack
                className={classes.resulteWrapper}
                onMouseLeave={() => closeNoti()}
              >
                {notification.map((item, index) => (
                  <Flex
                    key={index}
                    className={classes.searchItem}
                    onClick={() => handleSelectResultNoti(item.topicid)}
                  >
                    <Avatar src={item.other_avatar} />
                    <div>
                      <Text lineClamp={2} className={classes.searchName}>
                        <b>{item.other_name}</b> đã thêm bài viết trong{' '}
                        <b>{item.topic_title}</b>
                      </Text>
                      <Text
                        className={cx('small_5-semibold', classes.textGrey)}
                      >
                        {formatCreatTimeTopic(item.create_time)}
                      </Text>
                    </div>
                  </Flex>
                ))}
              </Stack>
            </div>
          )}
        </Flex>
      </div>
      <div className={classes.content}>
        <Outlet />
        <Flex className={classes.footer}>
          <div className={classes.footerLeft}>
            <Text>Chịu trách nhiệm nội dung: Hoàng Minh Kiên</Text>
            <Text>
              Địa chỉ: Số 16 - Nguyên Xá, phường Minh Khai, Bắc Từ Liêm, Hà Nội
            </Text>
            <Text>Số điện thoại: 0946511867</Text>
          </div>
          <div className={classes.footerRight}>
            <Avatar src={images.logo} className={classes.logo} />
            <Text> © 2023</Text>
          </div>
        </Flex>
      </div>
    </Stack>
  );
};
export default Wrapper;

const makeStyles = createStyles(() => ({
  container: {
    gap: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#1E252B',
  },
  wrapper: {
    width: '100%',
    height: 80,
    backgroundColor: '#262D34',
  },
  header: {
    width: '100%',
    height: '100%',
    maxWidth: 1440,
    margin: '0px auto',
    alignItems: 'center',
    padding: '0px 10px',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    maxWidth: 1440,
    height: 600,
    margin: '0px auto',
    // overflowY: 'scroll',
    overflowX: 'hidden',
  },
  headerLeft: {
    gap: 10,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  banner: {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--primary-1)',
  },
  headerCenter: {
    position: 'relative',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C353D',
  },
  inputSearch: {
    border: 'none',
    color: 'var(--white)',
    backgroundColor: 'inherit',
    borderRadius: 8,
  },
  rootInput: {
    flex: 1,
    borderRadius: 8,
  },
  headerRight: {
    gap: 16,
    alignItems: 'center',
  },
  accountWrap: {
    width: '100%',
    position: 'absolute',
    top: '120%',
    borderRadius: 8,
    backgroundColor: 'var(--white)',
    boxShadow: 'var(--shadow)',
    zIndex: 99,
  },
  accountOptions: {
    gap: 0,
    width: '100%',
  },
  accountOption: {
    gap: 5,
    padding: 10,
    borderRadius: 4,
    cursor: 'pointer',
    color: 'var(--black)',
    backgroundColor: 'var(--white)',
    alignItems: 'center',
    ':hover': {
      // color: 'var(--white)',
      backgroundColor: 'var(--grey-light)',
    },
  },
  accountText: {
    fontSize: 16,
    fontWeight: 550,
  },
  bellWrap: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2C353D',
  },
  headerUser: {
    gap: 12,
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  avatarWrap: {
    padding: 3,
    borderRadius: 8,
    border: '2px solid var(--primary-1)',
  },
  username: {
    color: 'var(--white)',
  },
  resultSearch: {
    width: '100%',
    position: 'absolute',
    top: '120%',
    zIndex: 99,
    borderRadius: 8,
    backgroundColor: '#262D34',
    overflow: 'scroll',
    boxShadow: 'var(--shadow)',
    maxHeight: '50vh',
  },
  resulteWrapper: {
    gap: 12,
    borderRadius: 8,
    padding: 10,
    height: 'max-contet',
  },
  searchItem: {
    gap: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2C353D',
    alignItems: 'center',
    cursor: 'pointer',
    ':hover': {
      // color: 'var(--white)',
      backgroundColor: '#7a1ce6',
    },
  },
  searchName: {
    color: 'var(--white)',
  },

  textGrey: {
    color: '#C5D0E6',
  },

  notiCount: {
    color: 'var(--white)',
    fontSize: 12,
    fontWeight: 600,
    background: '#f00606',
    textAlign: 'center',
    width: 20,
    height: 20,
    borderRadius: '50%',
    position: 'absolute',
    top: '2%',
    zIndex: 99,
  },

  noti: {
    // width: 350,
    // marginTop: 389,
    // marginRight: 100,
    position: 'absolute',
    top: '9.5%',
    left: '63.5%',
    width: '25%',
    zIndex: 99,
    borderRadius: 8,
    backgroundColor: '#262D34',
    overflow: 'scroll',
    boxShadow: 'var(--shadow)',
    maxHeight: '50vh',
  },
  author: {
    color: 'var(--white)',
  },

  footerLeft: {
    marginTop: 30,
    marginLeft: 40,
  },

  footerRight: {
    marginTop: 20,
    marginRight: 40,
  },

  footer: {
    color: 'var(--white)',
    backgroundColor: '#1c1d1f',
    height: 120,
    width: '100%',
    maxWidth: 1440,
    margin: '0px auto',
    justifyContent: 'space-between',
  },
}));

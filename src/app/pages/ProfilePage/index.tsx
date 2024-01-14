import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Center,
  Flex,
  Loader,
  LoadingOverlay,
  Select,
  Stack,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';

import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';
import Topic from '../ForumPage/components/Topic';
import { useForm } from '@mantine/form';
import { FilledButton } from 'app/components/Button/FilledButton';
import { apiPost } from 'utils/http/request';
import Icon from 'app/components/Icon/Icon';
import SingleImg from 'app/components/Upload/SingleImg';
import { ReactComponent as ImageIcon } from 'assets/icons/general/image.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { media } from 'styles/media';
import TopicMe from 'app/components/TopicMe';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, token, avatar, nickName, username, topicsMe, email, age } =
    useSelector(selectAuth);

  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [category, setCategory] = useState<string | null>(null);
  const [source, setSource] = useState<string>(avatar);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadImg, setLoadImg] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      nickname: '' || nickName,
      email: '' || email,
      age: '' || age,
    },
  });
  const handleSubmitInfo = () => {
    setLoading(true);
    apiPost(
      '/ez/v1/profile/update',
      {
        nick_name: form.values.nickname,
        email: form.values.email,
        avatar: source,
        age: form.values.age,
      },
      {
        userid: id,
        token: token,
      },
    )
      .then(res => {
        const { data, error } = res;
        console.log(res);
        if (error === 0) {
          dispatch(
            authActions.setInfoUser({
              age: data.age,
              avatar: data.avatar,
              email: data.email,
              nickName: data.nick_name,
            }),
          );
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    dispatch(authActions.requestTopicMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (source !== '') {
      setLoadImg(false);
    }
  }, [source]);
  return (
    <>
      <Helmet>
        <title>{t('Home.Tài khoản')}</title>
        <meta name="description" content="A Boilerplate application MyPost" />
      </Helmet>
      <form onSubmit={form.onSubmit(handleSubmitInfo)}>
        <Flex className={classes.container}>
          <Stack className={classes.accountLeft}>
            <Flex className={classes.contentLeft}>
              <div className={classes.imgWrapper}>
                <LoadingOverlay
                  radius={16}
                  zIndex={299}
                  visible={loadImg}
                  loader={<Loader />}
                />
                <Avatar
                  src={source}
                  className={classes.avatar}
                  classNames={{
                    image: classes.img,
                  }}
                >
                  <Center className={classes.imgBackground}>
                    <Icon icon={ImageIcon} large={28} />
                  </Center>
                </Avatar>
                <SingleImg
                  onLoad={setLoadImg}
                  fileState={[source, setSource]}
                  style={classes.uploadBtn}
                >
                  <></>
                </SingleImg>
              </div>
              <div className={classes.text}>
                <Text color="var(--white)" className="title_1-bold">
                  {nickName || username}
                </Text>
                <Text color="var(--grey-light)" className="body_5-semibold">
                  {topicsMe.length} {t('Home.Chủ đề')}
                </Text>
              </div>
            </Flex>

            <Stack className={classes.formWrap}>
              <Flex className={classes.formFeild}>
                <Text className={classes.label}>{t('Profile.Biệt danh')}</Text>
                <TextInput
                  classNames={{
                    root: classes.rootInput,
                    input: classes.input,
                  }}
                  {...form.getInputProps('nickname')}
                />
              </Flex>
              <Flex>
                <Text className={classes.label}>{t('Profile.Email')}</Text>
                <TextInput
                  classNames={{
                    root: classes.rootInput,
                    input: classes.input,
                  }}
                  {...form.getInputProps('email')}
                />
              </Flex>
              <Flex>
                <Text className={classes.label}>{t('Profile.Tuổi')}</Text>
                <TextInput
                  classNames={{
                    root: classes.rootInput,
                    input: classes.input,
                  }}
                  {...form.getInputProps('age')}
                />
              </Flex>
              <FilledButton
                loading={loading}
                disabled={
                  !form.values.nickname ||
                  !form.values.age ||
                  !form.values.email
                }
                type="submit"
              >
                Cập nhật
              </FilledButton>
            </Stack>
          </Stack>
          {location.pathname !== '/account/udpate' && (
            <Stack className={classes.accountRight}>
              <div className={classes.contentRight}>
                <Flex className={classes.headerRight}>
                  <Text color="var(--white)" className="subtitle_1-bold">
                    {t('Home.Chủ đề')}
                  </Text>
                </Flex>
              </div>
              <div className={classes.itemRight}>
                <Stack>
                  {topicsMe.map((topic, index) => (
                    <TopicMe key={index} data={topic} />
                  ))}
                </Stack>
              </div>
            </Stack>
          )}
          <div>
            <Outlet />
          </div>
        </Flex>
      </form>
    </>
  );
};

const makeStyles = createStyles(() => ({
  container: {
    gap: 20,
    width: '100%',
    height: 'calc(100vh - 80px)',
    padding: '20px 0px',
  },
  accountLeft: {
    width: '40%',
    borderRadius: 16,
    height: 'max-content',
    padding: 16,
    backgroundColor: '#262D34',
  },
  contentLeft: {
    gap: 16,
    width: '100%',
    padding: '18px 10px',
  },
  picture: {
    borderRadius: 0,
    padding: '0px !important',
  },
  imageAvatar: {
    borderRadius: '50%',
  },
  text: {
    flex: 1,
  },

  wrapperSelect: {
    height: 42,
  },
  inputSelect: {
    height: 42,
    border: 'none',
    color: 'var(--white)',
    borderRadius: 8,
    backgroundColor: '#2C353D',
    fontSize: 16,
    fontWeight: 600,
  },
  accountRight: {
    overflow: 'scroll',
    width: '60%',
  },
  contentRight: {
    borderRadius: 16,
  },
  headerRight: {
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px',
    borderRadius: '16px 16px 0px 0px',
    backgroundColor: '#262D34',
    borderBottom: '1px solid var(--white)',
  },
  itemRight: {
    overflowY: 'scroll',
  },
  formWrap: {
    width: '100%',
  },
  label: {
    width: '20%',
    fontSize: 18,
    fontWeight: 800,
    color: 'var(--white)',
  },
  formFeild: {
    width: '100%',
  },
  rootInput: {
    flex: 1,
  },
  input: {
    fontSize: 18,
    fontWeight: 600,
  },
  imgWrapper: {
    position: 'relative',
  },
  uploadBtn: {
    width: '100%',
    height: '100%',
    padding: 0,
    borderRadius: 16,
    backgroundColor: 'transparent !important',
    border: 'none',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 298,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--white-light)',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    padding: 3,
    border: '2px solid var(--primary-1)',
    cursor: 'pointer',
  },
  img: {
    borderRadius: '50%',
  },
}));

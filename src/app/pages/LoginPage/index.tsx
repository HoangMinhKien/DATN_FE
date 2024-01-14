import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Flex, Group, Text, createStyles } from '@mantine/core';

import LoginForm from './components/LoginForm/LoginForm';
import Carousels from './components/Carousels/Carousels';
import { selectAuth } from 'store/slice/auth/selectors';
import { notifications } from '@mantine/notifications';
import { authActions } from 'store/slice/auth';
import { images } from 'assets/images';
import { media } from 'styles/media';

export function LoginPage() {
  const dispath = useDispatch();
  const { response } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  React.useEffect(() => {
    if (response.error !== -1) {
      notifications.show({
        color: 'red',
        autoClose: 3000,
        title:
          response.error === 0 ? t('Login.Thông báo!') : t('Login.Cảnh báo!'),
        message:
          response.error === 12
            ? t('Login.Tên đăng nhập đã tồn tại')
            : response.error === 11 || response.error === 10
            ? t('Login.Tên đăng nhập hoặc mật khẩu không chính xác!')
            : '',
        onClose: () => dispath(authActions.resetResponse()),
        styles: () => ({
          title: { fontSize: 18, fontWeight: 700, color: 'var(--second-3)' },
          description: { color: 'var(--black)', fontWeight: 600 },
        }),
      });
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      <Helmet>
        <title>LoginPage</title>
        <meta
          name="description"
          content="A Boilerplate application loginPage"
        />
      </Helmet>
      <Flex className={classes.container}>
        <Flex className={classes.header}>
          <Group className={classes.bannerGroup}>
            <Avatar src={images.logo} className={classes.logo} />
            <Text className={cx('title_1-bold', classes.banner)}>TechTalk</Text>
          </Group>
        </Flex>
        <LoginForm />
        <Carousels />
      </Flex>
    </>
  );
}

const makeStyles = createStyles(() => ({
  container: {
    width: '100vw',
    height: '100vh',
    [media.small()]: {
      gap: 0,
      flexDirection: 'column',
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
  },
  header: {
    position: 'fixed',
    width: '100%',
    height: 100,
    top: 0,
    left: 0,
    padding: '0px 32px',
    alignItems: 'center',
    zIndex: 99,

    [media.small()]: {
      padding: '0px 16px',
    },
  },
  logo: {
    width: 80,
    height: 80,
    [media.small()]: {
      width: 50,
      height: 50,
    },
  },
  banner: {
    [media.small()]: {
      color: 'var(--white)',
      fontSize: 18,
    },
  },
  bannerGroup: {
    [media.small()]: {
      gap: 10,
    },
  },
}));

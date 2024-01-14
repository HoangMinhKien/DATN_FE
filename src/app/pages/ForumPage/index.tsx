import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Stack, TextInput, createStyles } from '@mantine/core';

import SideBar from './components/SideBar';
import RightBar from './components/RightBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/slice/auth';

export function ForumPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const [titleTopic, setTitleTopic] = React.useState<string>('');
  const handleCreateTitleTopic = () => {
    dispatch(
      authActions.createTitleTopic({
        titleTopic: titleTopic,
      }),
    );
    navigate('/home/create');
  };
  return (
    <Flex className={classes.wrapper}>
      <SideBar />
      <Stack className={classes.content}>
        {location.pathname !== '/home/create' && (
          <Flex className={classes.createWrap}>
            <TextInput
              value={titleTopic}
              onChange={event => setTitleTopic(event.currentTarget.value)}
              placeholder={t('Home.Hãy chia sẻ chủ để của bạn')}
              classNames={{
                input: cx('body_5-semibold', classes.inputCreate),
                wrapper: classes.wrapperInput,
                root: classes.rootInput,
              }}
            />
            <Button
              className={cx(classes.createBtn, 'body_1-bold')}
              onClick={handleCreateTitleTopic}
            >
              {t('Home.Tạo chủ đề')}
            </Button>
          </Flex>
        )}
        <div className={classes.list}>
          <Outlet />
        </div>
      </Stack>
      <RightBar />
    </Flex>
  );
}

const makeStyles = createStyles(() => ({
  wrapper: {
    gap: 20,
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    height: '100%',
  },
  createWrap: {
    gap: 20,
    height: 86,
    borderRadius: 16,
    padding: '12px 14px 12px 12px',
    backgroundColor: '#262D34',
    boxShadow: '0 0 10px rgba(0,0,0,.1)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createBtn: {
    height: 44,
    color: 'var(--white)',
    borderRadius: 8,
    backgroundColor: 'var(--primary-1)',
    ':hover': {
      backgroundColor: 'var(--primary-1)',
    },
  },
  inputCreate: {
    height: '100%',
    borderRadius: 8,
    border: 'none',
    color: 'var(--white)',
    backgroundColor: '#2C353D',
  },
  wrapperInput: {
    height: 44,
  },
  rootInput: {
    flex: 1,
  },
  list: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
}));

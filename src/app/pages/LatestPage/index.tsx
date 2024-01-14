import { Stack } from '@mantine/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Topic from '../ForumPage/components/Topic';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';

export const LatestPage = () => {
  const dispatch = useDispatch();
  const { topicsNews } = useSelector(selectAuth);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(authActions.requestTopicNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('Mới nhất và gần đây')}</title>
        <meta
          name="description"
          content="A Boilerplate application PopularPage"
        />
      </Helmet>
      <Stack>
        {topicsNews.map((topic, index) => (
          <Topic key={index} data={topic} />
        ))}
      </Stack>
    </>
  );
};

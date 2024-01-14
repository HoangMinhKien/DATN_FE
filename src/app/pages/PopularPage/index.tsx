import { Stack } from '@mantine/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Topic from '../ForumPage/components/Topic';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';

export const PopularPage = () => {
  const dispatch = useDispatch();
  const { topicsPopular } = useSelector(selectAuth);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(authActions.requestTopicPopular());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('Home.Phổ biến trong ngày')}</title>
        <meta
          name="description"
          content="A Boilerplate application PopularPage"
        />
      </Helmet>
      <Stack>
        {topicsPopular.map((topic, index) => (
          <Topic key={index} data={topic} />
        ))}
      </Stack>
    </>
  );
};

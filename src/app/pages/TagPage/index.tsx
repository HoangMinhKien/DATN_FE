import { Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Topic from '../ForumPage/components/Topic';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';
import { useParams } from 'react-router-dom';

export const TagPage = () => {
  const { tagname } = useParams();
  const dispatch = useDispatch();
  const { topicsTag } = useSelector(selectAuth);

  const { t } = useTranslation();

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    dispatch(
      authActions.requestGetTopicTag({
        tagname: tagname,
        page: page,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(tagname);
  return (
    <>
      <Helmet>
        <title>{t('Home.Thẻ')}</title>
        <meta name="description" content="A Boilerplate application TagPage" />
      </Helmet>
      <Stack>
        {topicsTag.map((topic, index) => (
          <Topic key={index} data={topic} />
        ))}
      </Stack>
    </>
  );
};

import { Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Topic from '../ForumPage/components/Topic';
import { authActions } from 'store/slice/auth';
import { selectAuth } from 'store/slice/auth/selectors';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const { topicsCategory } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(
      authActions.requestTopicWithCategory({
        page: page,
        categoryId: categoryId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, categoryId]);
  return (
    <>
      <Helmet>
        <title>Danh mục</title>
        <meta
          name="description"
          content="A Boilerplate application CategoryPage"
        />
      </Helmet>
      <Stack pb={16}>
        {topicsCategory.map((topic, index) => (
          <Topic key={index} data={topic} />
        ))}
      </Stack>
    </>
  );
};

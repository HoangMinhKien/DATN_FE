import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Flex, Stack, Text } from '@mantine/core';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow/arrow-narrow-right.svg';
import Icon from 'app/components/Icon/Icon';
import { sidebarStyes } from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/slice/auth';
import { selectAuth } from 'store/slice/auth/selectors';
import { useNavigate } from 'react-router-dom';

const RightBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tags } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { classes } = sidebarStyes();

  useEffect(() => {
    dispatch(authActions.requestGetTags());
  }, []);
  return (
    <Stack maw={355} className={classes.container}>
      <Stack className={classes.options}>
        <Text color="var(--white)" className="subtitle_1-bold">
          {t('Home.Thẻ')}
        </Text>
        <Flex className={classes.tagsList}>
          {tags.map((tag, index) => (
            <Box
              key={index}
              className={classes.tagWrap}
              onClick={() => navigate(`/home/tag/${tag.name}`)}
            >
              <Text className={classes.tagName}>{tag.name}</Text>
            </Box>
          ))}
        </Flex>
      </Stack>
      {/* <Stack className={classes.options}>
        <Flex className={classes.favouriteTitle}>
          <Text color="var(--white)" className="subtitle_1-bold">
            {t('Home.Yêu thích')}
          </Text>
          <Icon icon={ArrowLeft} large={28} />
        </Flex>
        <Flex className={classes.option}>
          <Avatar src={''} className={classes.avatar} />
          <div className={classes.favouriteCard}>
            <Text lineClamp={2} className="body_4-bold">
              Selling a Business and Scaling Another Amidst Tragedy.
            </Text>
            <Text color="#97989D" className="small_2-semibold">
              {t('Home.bởi')} Michele Hansen
            </Text>
          </div>
        </Flex>
      </Stack> */}
    </Stack>
  );
};
export default RightBar;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Flex, Stack, Text, createStyles } from '@mantine/core';
import { TopicState } from 'store/slice/auth/type';
import { formatCreatTimeTopic } from 'utils/helpers/formatCreatTimeTopic';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: TopicState;
}
const Topic = ({ data }: Props) => {
  const navigate = useNavigate();
  const { categoryColor, avatar } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();
  return (
    <Flex
      className={classes.container}
      onClick={() => navigate(`/detail/${data.id}`)}
    >
      <Avatar src={data.img} className={classes.topicImage} />
      <Stack
        sx={{
          flex: 1,
        }}
      >
        <Stack>
          <Text lineClamp={2} className={cx('body_1-bold', classes.textWhite)}>
            {data.title}
          </Text>
          <Flex className={classes.textGrey}>
            {data.tags?.map((tag, index) => (
              <Box key={index} className={classes.tagWrap}>
                <Text className={classes.tag}>{tag}</Text>
              </Box>
            ))}
          </Flex>
        </Stack>
        <Flex className={classes.information}>
          <Flex className={classes.authorWrap}>
            <Avatar
              src={data.author_avatar || avatar}
              className={classes.author}
            />
            <div>
              <Text className={cx('small_2-semibold', classes.textWhite)}>
                {data.author_name}
              </Text>
              <Text className={cx('small_5-semibold', classes.textGrey)}>
                {formatCreatTimeTopic(data.create_time)}
              </Text>
            </div>
          </Flex>
          <Flex className={cx('small_2-semibold', classes.actions)}>
            <Text>
              <span className="body_4-bold">{data.view}</span>{' '}
              {t('Forum.Lượt xem')}
            </Text>
            <Text>
              <span className="body_4-bold">{data.likes}</span>{' '}
              {t('Forum.Lượt thích')}
            </Text>
            <Text>
              <span className="body_4-bold">{data.post}</span>{' '}
              {t('Forum.Bài viết')}
            </Text>
          </Flex>
        </Flex>
      </Stack>
      <Box
        sx={{
          width: 100,
          height: 100,
          top: -60,
          right: -60,
          transform: 'rotate(135deg)',
          position: 'absolute',
          backgroundColor: `${categoryColor[data.categoryid - 1]}`,
        }}
      ></Box>
    </Flex>
  );
};

export default Topic;

const makeStyles = createStyles(() => ({
  container: {
    gap: 16,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#262D34',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },
  topicImage: {
    width: 120,
    height: 120,
  },
  textWhite: {
    color: 'var(--white)',
  },
  textGrey: {
    color: '#C5D0E6',
  },
  tagWrap: {
    borderRadius: 20,
    padding: '4px 10px',
    backgroundColor: '#2C353D',
  },
  tag: {
    fontSize: 12,
    fontWeight: 600,
  },
  authorWrap: {
    gap: 10,
  },
  author: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },
  information: {
    width: '100%',
    color: '#C5D0E6',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    gap: 40,
  },
}));

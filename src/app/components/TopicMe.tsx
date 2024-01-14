import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Flex, Stack, Text, createStyles } from '@mantine/core';
import { TopicState } from 'store/slice/auth/type';
import { formatCreatTimeTopic } from 'utils/helpers/formatCreatTimeTopic';
import { ReactComponent as Delete } from 'assets/icons/general/delete.svg';
import { ReactComponent as Edit } from 'assets/icons/general/edit.svg';
import Icon from './Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';
import { useNavigate } from 'react-router-dom';
import { apiDelete, apiGet } from 'utils/http/request';

interface Props {
  data: TopicState;
}
const TopicMe = ({ data }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryColor, currentTopic, topicEdit, avatar, id, token } =
    useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const handleEditTopic = topicId => {
    dispatch(
      authActions.requestGetDetailTopic({
        topicId: topicId,
      }),
    );
    localStorage.setItem('TopicUpdate', JSON.stringify(currentTopic));
    navigate(`/account/udpate`);
  };

  const handleConfirm = topicId => {
    const confirmed = window.confirm('Bạn chắc chắn muốn xóa chủ đề này?');
    if (confirmed) {
      handleDelete(topicId);
    }
  };

  const handleDelete = topicId => {
    apiDelete(`/ez/v1/topic/delete?topicid=${topicId}`, {
      userid: id,
      token: token,
    })
      .then(res => {
        if (res.error === 0) {
          window.location.reload(); // Tải lại trang web
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <Flex className={classes.container}>
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
            <Text
              lineClamp={2}
              className={cx('body_1-bold', classes.textWhite)}
            >
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
      </Flex>
      <Stack className={classes.iconRight}>
        <div onClick={() => handleConfirm(data.id)}>
          <Icon icon={Delete} large={24} color="var(--white)" />
        </div>
        <div onClick={() => handleEditTopic(data.id)}>
          <Icon icon={Edit} large={24} color="var(--white)" />
        </div>
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

export default TopicMe;

const makeStyles = createStyles(() => ({
  container: {
    gap: 16,
    width: '95%',
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
  iconRight: {
    position: 'absolute',
    left: '93.5%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

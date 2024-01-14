import React, { useLayoutEffect, useState } from 'react';
import {
  Avatar,
  Container,
  Flex,
  Stack,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Send } from 'assets/icons/general/send.svg';
import { formatCreatTimeTopic } from 'utils/helpers/formatCreatTimeTopic';
import { ReactComponent as Like } from 'assets/icons/general/like.svg';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { selectAuth } from 'store/slice/auth/selectors';
import { authActions } from 'store/slice/auth';
import { ReactComponent as Delete } from 'assets/icons/general/deleteBlack.svg';
import { apiPost, apiDelete } from 'utils/http/request';
import Icon from 'app/components/Icon/Icon';
import parse from 'html-react-parser';

export const Detail = () => {
  const dispatch = useDispatch();
  const { topicId } = useParams();
  const { currentTopic, id, token, avatar } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const [isLike, setIsLike] = useState<boolean>(false);
  const [isCmt, setIsCmt] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  useLayoutEffect(() => {
    dispatch(
      authActions.requestGetDetailTopic({
        topicId: topicId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const handleConfirm = postId => {
    const confirmed = window.confirm('Bạn chắc chắn muốn xóa bài viết này?');
    if (confirmed) {
      handleDelete(postId);
    }
  };

  const handleDelete = postId => {
    apiDelete(`/ez/v1/post/delete?postid=${postId}`, {
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

  const handleLikeTopic = () => {
    setIsLike(prev => !prev);
    apiPost(
      `/ez/v1/topic/updatelike`,
      {
        topicid: currentTopic.id,
      },
      {
        userid: id,
        token: token,
      },
    )
      .then(res => {
        console.log(res);
        if (res.error !== 0) {
          setIsLike(prev => !prev);
        } else {
          dispatch(
            authActions.requestGetDetailTopic({
              topicId: topicId,
            }),
          );
        }
      })
      .catch(err => console.log(err));
  };
  const handleShowComment = () => {
    setIsCmt(prev => !prev);
  };

  const handleCreateComment = () => {
    if (content !== '') {
      dispatch(
        authActions.requestCreateComment({
          img: [],
          content: content,
          topicid: currentTopic.id,
        }),
      );
    }
    setContent('');
  };
  return (
    <Container fluid className={classes.container}>
      <Flex className={classes.header}>
        <Avatar
          className={classes.avatar}
          src={currentTopic.topic_author_avatar}
        />
        <div>
          <Text className="body_2-semibold">
            {currentTopic.topic_author_name}
          </Text>
          <Text className="small_2-semibold">
            {formatCreatTimeTopic(currentTopic.create_time)}
          </Text>
        </div>
        <SubtleButton
          sx={{
            color: isLike ? '#ff0000' : '#C5D0E6',
          }}
          className={classes.likeBtn}
          onClick={handleLikeTopic}
        >
          <Like width={32} height={32} />
        </SubtleButton>
      </Flex>
      <Text className={cx('subtitle_2-semibold', classes.title)}>
        {currentTopic.title}
      </Text>
      <div className={classes.content}>{parse(currentTopic.content)}</div>
      <Avatar src={currentTopic.img[0]} className={classes.picture} />
      <Flex className={classes.information}>
        <SubtleButton className={classes.cmtBtn} onClick={handleShowComment}>
          {t('Bài viết')}
        </SubtleButton>
        <Flex className={classes.action}>
          <Text>
            {currentTopic.likes} {t('Forum.Lượt thích')}
          </Text>
          <Text>
            {currentTopic.post} {t('Bài viết')}
          </Text>
        </Flex>
      </Flex>
      <Flex className={classes.cmtWrap}>
        <Avatar radius="xl" src={avatar} />
        <TextInput
          placeholder={t('Viết bài ...')}
          classNames={{
            root: classes.rootInput,
            input: classes.input,
          }}
          rightSection={
            <SubtleButton onClick={handleCreateComment}>
              <Icon icon={Send} large={24} />
            </SubtleButton>
          }
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </Flex>
      {isCmt && (
        <Stack className={classes.postWrap}>
          {currentTopic.posts.map(post => (
            <Flex key={post.id} className={classes.post}>
              <Avatar radius="xl" src={post.post_user_avatar} />
              <div className={classes.postContent}>
                <Flex className={classes.icondel}>
                  <Text className={classes.postAuthor}>
                    {post.post_user_name}
                  </Text>
                  {post.userid === id && (
                    <div
                      className={classes.icondel}
                      onClick={() => handleConfirm(post.id)}
                    >
                      <Icon icon={Delete} large={20} color="var(--white)" />
                    </div>
                  )}
                </Flex>
                <Text className={classes.postText}>{post.content}</Text>
              </div>
            </Flex>
          ))}
        </Stack>
      )}
    </Container>
  );
};

const makeStyles = createStyles(() => ({
  container: {
    width: '100%',
    height: 'max-content',
    maxWidth: 680,
    backgroundColor: '#121212',
    borderRadius: 8,
    margin: '20px auto',
    padding: '0px 0px 16px',
    color: 'var(--white)',
  },
  header: {
    gap: 12,
    width: '100%',
    padding: '10px 16px',
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  title: {
    padding: '10px 16px',
  },
  content: {
    padding: '8px 16px',
  },
  picture: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    marginBottom: 10,
  },
  information: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    borderTop: '1px solid var(--white)',
  },
  cmtBtn: {
    fontSize: 18,
    fontWeight: 600,
  },
  action: {
    gap: 16,
    fontSize: 16,
    fontWeight: 600,
  },
  likeBtn: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
  cmtWrap: {
    gap: 16,
    padding: '0px 16px',
    justifyContent: 'space-between',
  },
  myself: {
    width: 32,
    height: 32,
    borderRadius: '50%',
  },
  rootInput: {
    flex: 1,
  },
  input: {
    width: '100%',
    borderRadius: 16,
  },
  postWrap: {
    padding: 16,
    maxHeight: 500,
    overflowY: 'scroll',
  },
  post: {
    gap: 16,
  },
  postContent: {
    width: '100%',
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: '10px 8px',
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 800,
  },
  postText: {
    fontSize: 16,
    fontWeight: 400,
  },

  icondel: {
    justifyContent: 'space-between',
  },
}));

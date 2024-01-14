import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Center, LoadingOverlay, createStyles } from '@mantine/core';

import { ReactComponent as ImageIcon } from 'assets/icons/general/image.svg';
import SingleImg from 'app/components/Upload/SingleImg';
import Loader from 'app/components/Loader/Loader';
import { media } from 'styles/media';
import Icon from 'app/components/Icon/Icon';
import { authActions } from 'store/slice/auth';

const Image = () => {
  const dispatch = useDispatch();
  const { classes } = makeStyles();

  const [source, setSource] = useState<string>('');
  const [loadImg, setLoadImg] = useState<boolean>(false);

  useEffect(() => {
    if (source !== '') {
      dispatch(authActions.setAvatarTopic(source));
      setLoadImg(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);
  return (
    <div className={classes.imgWrapper}>
      <LoadingOverlay
        radius={16}
        zIndex={299}
        visible={loadImg}
        loader={<Loader />}
      />
      <Avatar src={source} className={classes.avatar}>
        <Center className={classes.imgBackground}>
          <Icon icon={ImageIcon} large={28} />
        </Center>
      </Avatar>
      <SingleImg
        onLoad={setLoadImg}
        fileState={[source, setSource]}
        style={classes.uploadBtn}
      >
        <></>
      </SingleImg>
    </div>
  );
};

export default Image;

const makeStyles = createStyles(() => ({
  imgWrapper: {
    position: 'relative',
  },
  uploadBtn: {
    width: '100%',
    height: '100%',
    padding: 0,
    borderRadius: 16,
    backgroundColor: 'transparent !important',
    border: 'none',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 298,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--white-light)',
  },

  avatar: {
    width: 144,
    height: 144,
    borderRadius: 16,
    cursor: 'pointer',
    [media.small()]: {
      width: 80,
      height: 80,
    },
  },
}));

import React, { Dispatch, SetStateAction } from 'react';
import { Button, FileButton, Group } from '@mantine/core';
import axios from 'axios';

interface SingleState {
  style: string;
  children: JSX.Element;
  fileState: [string, Dispatch<SetStateAction<string>>];
  onLoad: Dispatch<SetStateAction<boolean>>;
}

const SingleImg = ({ fileState, children, style, onLoad }: SingleState) => {
  const [source, setSource] = fileState;

  const handleUploadImgBB = async payload => {
    onLoad(true);
    await axios
      .post(
        'https://api.imgbb.com/1/upload?key=8bb7d949ede7343288e774b74722308d',
        { image: payload },
        {
          headers: { 'content-type': 'multipart/form-data' },
        },
      )
      .then(res => {
        const { data } = res.data;
        setSource(data.url);
      })
      .catch(() => {
        setSource('');
        onLoad(false);
      });
  };
  return (
    <Group position="center">
      <FileButton onChange={handleUploadImgBB} accept="image/png,image/jpeg">
        {props => (
          <Button className={style} {...props}>
            {children}
          </Button>
        )}
      </FileButton>
    </Group>
  );
};

export default SingleImg;

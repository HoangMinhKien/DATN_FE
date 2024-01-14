import React, { useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow/chevron-left.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow/chevron-right.svg';
import { sliderArray } from 'utils/arrays/sliderArray';
import Card from '../Card/Card';
import { useTranslation } from 'react-i18next';
import Register from '../Register/Register';
import { media } from 'styles/media';

const Carousels = () => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const slides = sliderArray.map(item => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  return (
    <div className={classes.wrapper}>
      <Carousel
        loop
        classNames={{
          root: classes.root,
          viewport: classes.viewport,
          container: classes.container,
          controls: classes.controls,
          control: classes.control,
          slide: classes.slide,
        }}
        nextControlIcon={<ArrowRight />}
        previousControlIcon={<ArrowLeft />}
      >
        {slides}
      </Carousel>
      <Button
        variant="outline"
        className={classes.registerBtn}
        onClick={() => setIsRegister(true)}
      >
        {t('Login.Đăng ký')}
      </Button>
      <Register isShow={isRegister} onClose={setIsRegister} />
    </div>
  );
};

export default Carousels;

const makeStyles = createStyles(() => ({
  wrapper: {
    flex: 1,
    width: '50%',
    height: '100vh',
    position: 'relative',
    [media.small()]: {
      order: 1,
      width: '100%',
      minHeight: '100vh',
    },
  },
  root: {
    width: '100%',
    height: '100%',
    position: 'static',
  },
  viewport: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  controls: {
    gap: 10,
    left: 90,
    bottom: 90,
    top: 'initial',
    width: 'max-content',
    zIndex: 3,
    [media.small()]: {
      width: '60%',
      left: '50%',
      bottom: 45,
      transform: 'translateX(-50%)',
    },
  },
  control: {
    height: 40,
    width: 40,
    border: 'none',
    backgroundColor: 'var(--black)',
  },
  slide: {
    position: 'relative',
    '::after': {
      content: "''",
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 10,
    },
  },
  registerBtn: {
    width: 160,
    height: 42,
    borderRadius: 100,
    marginTop: 16,
    color: 'var(--white)',
    border: '1px solid var(--white)',
    backgroundColor: 'transparent !important',
    position: 'absolute',
    bottom: '30%',
    left: 90,
    zIndex: 3,
    [media.small()]: {
      left: '50%',
      bottom: '20%',
      transform: 'translateX(-50%)',
    },
  },
}));

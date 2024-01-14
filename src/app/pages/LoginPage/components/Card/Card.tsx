import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Text, Title, createStyles } from '@mantine/core';
import { media } from 'styles/media';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

const Card = ({ image, title, category }: CardProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  return (
    <Paper sx={{ backgroundImage: `url(${image})` }} className={classes.card}>
      <div className={classes.content}>
        <Text className={classes.category}>{category}</Text>
        <Title className={classes.title}>{title}</Title>
      </div>
    </Paper>
  );
};

export default Card;

const makeStyles = createStyles(() => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 0,
  },
  content: {
    color: 'var(--white)',
    padding: '0px 300px 0px 90px',
    position: 'relative',
    zIndex: 11,
    [media.small()]: {
      padding: '0px 16px',
      textAlign: 'center',
    },
  },
  title: {
    fontWeight: 900,
    fontSize: 32,
    [media.small()]: {
      padding: '16px 0px',
    },
  },

  category: {
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  tutorial: {},
}));

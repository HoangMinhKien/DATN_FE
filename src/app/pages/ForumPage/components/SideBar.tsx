import React from 'react';
import { Box, Stack, Text, createStyles } from '@mantine/core';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { optionArray } from 'utils/arrays/optionArray';
import Icon from 'app/components/Icon/Icon';
import { categoryArray } from 'utils/arrays/categoryArray';

const SideBar = () => {
  const { t } = useTranslation();
  const { cx, classes } = sidebarStyes();
  return (
    <Stack maw={280} className={classes.container}>
      <Stack className={classes.options}>
        {optionArray.map((option, index) => (
          <NavLink
            key={index}
            to={option.navigate}
            className={cx(classes.option, ({ isActive }) =>
              isActive ? 'active' : '',
            )}
          >
            <div className={classes.iconWrap}>
              <Icon icon={option.icon} large={28} />
            </div>
            <div>
              <Text className="body_1-bold">{t(`Home.${option.name}`)}</Text>
              <Text color="#97989D" className="small_5-semibold">
                {t(`Home.${option.description}`)}
              </Text>
            </div>
          </NavLink>
        ))}
      </Stack>
      <Stack className={cx(classes.options, classes.category)}>
        <Text color="var(--white)" className="subtitle_1-bold">
          {t('Home.Danh mục')}
        </Text>
        {categoryArray.map((category, index) => (
          <NavLink
            key={index}
            to={`/home/category/${category.navigate}/${category.categoryId}`}
            className={cx(
              classes.option,
              classes.categoryItem,
              ({ isActive }) => (isActive ? 'active' : ''),
            )}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 8,
                backgroundColor: category.color,
              }}
            ></Box>
            <div>
              <Text className="body_1-bold">{t(`Home.${category.name}`)}</Text>
            </div>
          </NavLink>
        ))}
      </Stack>
    </Stack>
  );
};

export default SideBar;

export const sidebarStyes = createStyles(() => ({
  container: {
    gap: 20,
    height: '100%',
    width: '100%',
  },
  options: {
    borderRadius: 16,
    padding: '12px 14px 12px 12px',
    backgroundColor: '#262D34',
    boxShadow: '0 0 10px rgba(0,0,0,.1)',
  },
  option: {
    gap: 8,
    display: 'flex',
    textDecoration: 'none',
    color: 'var(--white)',
    borderRadius: 8,
    padding: '6px 5px',
    alignItems: 'center',
    ':hover': {
      backgroundColor: '#2C353D',
    },
    '&.active': {
      backgroundColor: 'var(--primary-1)',
    },
  },
  iconWrap: {
    width: 42,
    height: 42,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#2C353D',
  },
  category: {
    gap: 8,
    padding: '18px 13px 20px 20px',
  },
  categoryItem: {
    padding: '9.2px 16px',
    '&.active': {
      color: 'var(--black)',
      backgroundColor: 'var(--white-light)',
    },
  },
  favouriteCard: {
    flex: 1,
    color: 'var(--white)',
  },
  avatar: {
    width: 58,
    height: 58,
  },
  favouriteTitle: {
    alignItems: 'center',
    gap: 10,
  },
  tagsList: {
    flexWrap: 'wrap',
  },
  tagWrap: {
    padding: '4px 10px',
    backgroundColor: '#2C353D',
    borderRadius: 20,
    margin: '4px 0px',
  },
  tagName: {
    fontSize: 16,
    fontWeight: 800,
    color: 'var(--white)',
    cursor: 'pointer',
  },
}));

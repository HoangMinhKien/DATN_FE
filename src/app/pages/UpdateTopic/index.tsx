import React, { useState } from 'react';
import {
  Flex,
  MultiSelect,
  Select,
  Stack,
  Textarea,
  createStyles,
} from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Image from './components/Image';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow/caret-down.svg';
import Icon from 'app/components/Icon/Icon';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { authActions } from 'store/slice/auth';
import EditorTopic from './components/EditorTopic';
import { categoryArray } from 'utils/arrays/categoryArray';
import { CurrentTopic } from 'store/slice/auth/type';

export const UpdateTopic = () => {
  const dispatch = useDispatch();
  const { topicEdit } = useSelector(selectAuth);
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();
  const location = useLocation();

  const [category, setCategory] = useState<string | null>(null);
  const [createTag, setCreateTag] = useState<
    { value: string; label: string }[]
  >([
    { value: 'React', label: 'React' },
    { value: 'Angular', label: 'Angular' },
  ]);
  const [tag, setTag] = useState<string[]>([]);
  const [contentTopic, setContentTopc] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [loadImg, setLoadImg] = useState<boolean>(false);

  const removeLocal = () => {
    localStorage.removeItem('TopicUpdate');
  };

  const data: string | null = localStorage.getItem('TopicUpdate');
  const form = useForm({
    initialValues: {
      title: '',
    },
  });
  if (data !== null) {
    const currentData: CurrentTopic = JSON.parse(data);
    console.log(currentData);
    const handleSubmitUpdateTopic = () => {
      dispatch(
        authActions.requestUpdateTopic({
          id: currentData.id,
          title: form.values.title,
          categoryid: Number(category),
          content: contentTopic,
          img: currentData.img[0],
          tags: tag,
        }),
      );
    };
    return (
      <>
        <Helmet>
          <title>{t('Cập nhật')}</title>
          <meta
            name="description"
            content="A Boilerplate application CreateTopic"
          />
        </Helmet>
        {currentData !== null && (
          <div className={classes.container}>
            <form onSubmit={form.onSubmit(handleSubmitUpdateTopic)}>
              <Stack spacing={20}>
                <Stack className={classes.header}>
                  <Flex
                    sx={{
                      gap: 16,
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Image />
                    <Stack className={classes.content}>
                      <Textarea
                        defaultValue={currentData.title}
                        maxRows={2}
                        placeholder={t('Create.Nhập tiêu đề của đề tài')}
                        classNames={{
                          root: classes.rootName,
                          wrapper: classes.wrapperName,
                          input: cx('body_5-semibold', classes.inputName),
                        }}
                        onMouseUp={() => removeLocal()}
                      />
                      <Select
                        label={t('Home.Danh mục')}
                        placeholder={t('Home.Danh mục')}
                        value={`${currentData.categoryid}`}
                        onChange={setCategory}
                        rightSection={<Icon icon={ArrowDown} large={12} />}
                        data={[
                          { value: '1', label: t('Home.Thảo luận') },
                          { value: '2', label: t('Home.Hỏi đáp') },
                          { value: '3', label: t('Home.Công nghệ') },
                          { value: '4', label: t('Home.Phần cứng') },
                          { value: '5', label: t('Home.Phần mềm') },
                        ]}
                        classNames={{
                          wrapper: classes.wrapperSelect,
                          label: classes.labelSelect,
                          input: classes.inputSelect,
                        }}
                      />
                      <Stack className={classes.selectInfo}></Stack>
                    </Stack>
                  </Flex>
                  <MultiSelect
                    defaultValue={currentData.tags}
                    creatable
                    searchable
                    value={tag}
                    onChange={setTag}
                    data={createTag}
                    maxSelectedValues={3}
                    label={t('Home.Thẻ')}
                    placeholder={t('Home.Chọn thẻ')}
                    rightSection={<Icon icon={ArrowDown} large={12} />}
                    getCreateLabel={query => `+ Create ${query}`}
                    onCreate={query => {
                      const item = { value: query, label: query };
                      setCreateTag(current => [...current, item]);
                      return item;
                    }}
                    classNames={{
                      values: classes.valueSelect,
                      root: classes.rootMutil,
                      input: classes.inputSelect,
                      label: classes.labelSelect,
                      searchInput: classes.searchSelect,
                      defaultValue: classes.defaultValue,
                      defaultValueLabel: classes.defaultValueLabel,
                    }}
                  />
                </Stack>
                <EditorTopic onContent={setContentTopc} />
                <FilledButton
                  disabled={!form.values.title || tag.length === 0 || !category}
                  type="submit"
                  className={classes.createBtn}
                >
                  {t('Cập nhật chủ đề')}
                </FilledButton>
              </Stack>
            </form>
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

const makeStyles = createStyles(() => ({
  container: {
    borderRadius: 16,
    padding: '12px 14px 12px 12px',
    backgroundColor: '#262D34',
    boxShadow: '0 0 10px rgba(0,0,0,.1)',
  },
  header: {
    gap: 8,
    alignItems: 'center',
  },
  rootName: {
    flex: 1,
  },
  wrapperName: {},
  inputName: {
    height: '100%',
    borderRadius: 8,
    border: 'none',
    color: 'var(--white)',
    backgroundColor: '#2C353D',
  },
  content: {
    gap: 0,
    width: '100%',
  },
  labelSelect: {
    padding: '5px 0px',
    color: 'var(--white)',
    fontSize: 16,
    fontWeight: 600,
  },
  inputSelect: {
    height: 42,
    border: 'none',
    color: 'var(--white)',
    borderRadius: 8,
    backgroundColor: '#2C353D',
    fontSize: 16,
    fontWeight: 600,
  },
  searchSelect: {
    fontSize: 16,
    fontWeight: 600,
  },
  rootMutil: {
    width: '100%',
  },
  selectInfo: {
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  defaultValue: {
    height: '100%',
    margin: '4px 4px 0px !important',
  },
  wrapperSelect: {
    height: 42,
  },
  valueSelect: {
    height: '100%',
    padding: '4px 0px',
  },
  defaultValueLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
  createBtn: {
    height: 44,
  },
}));

import React from 'react';
import {
  Avatar,
  Center,
  Checkbox,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ReactComponent as User } from 'assets/icons/user/user-edit.svg';
import { ReactComponent as Key } from 'assets/icons/security/key-01.svg';
import { ReactComponent as EyeOff } from 'assets/icons/general/eye-off.svg';
import { ReactComponent as EyeOn } from 'assets/icons/general/eye.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import { images } from 'assets/images';
import { authActions } from 'store/slice/auth';
import { media } from 'styles/media';

const LoginForm = () => {
  const dispath = useDispatch();

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: value =>
        value.length <= 0
          ? t('Login.Vui lòng điền tên đăng nhập!')
          : value.length > 12
          ? t('Login.Tên đăng nhập quá dài!')
          : null,
      password: value =>
        value.length <= 0
          ? t('Login.Vui lòng nhập mật khẩu!')
          : value.length < 8
          ? t('Login.Tối thiểu 8 ký tự')
          : null,
    },
  });

  const handleSubmitLogin = () => {
    dispath(
      authActions.requestLogin({
        username: form.values.username,
        password: form.values.password,
      }),
    );
  };

  return (
    <Container fluid className={classes.container}>
      <Center className={classes.content}>
        <Stack className={classes.title}>
          <Avatar src={images.logo} className={classes.logo} />
          <Text className={cx('subtitle_1-bold', classes.align)}>
            {t('Login.Chào mừng trở lại')}
          </Text>
          <Text className={cx('body_6-regular', classes.align)}>
            {t(
              'Login.Tham gia chia sẻ và nhận về thông tin hữu ích về công nghệ ngay bây giờ!',
            )}
          </Text>
        </Stack>
        <form
          className={classes.formLogin}
          onSubmit={form.onSubmit(handleSubmitLogin)}
        >
          <TextInput
            icon={<User />}
            placeholder={t('Login.Tên đăng nhập')}
            classNames={{
              icon: classes.iconInput,
              root: classes.rootInput,
              input: cx('body_5-semibold', classes.input),
              wrapper: classes.inputWrapper,
            }}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            icon={<Key />}
            placeholder={t('Login.Mật khẩu')}
            classNames={{
              icon: classes.iconInput,
              root: classes.rootInput,
              input: cx('body_5-semibold', classes.input),
              visibilityToggle: classes.toogleInput,
              innerInput: 'body_5-semibold',
            }}
            {...form.getInputProps('password')}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOff /> : <EyeOn />
            }
          />
          <Checkbox
            label={t('Login.Lưu mật khẩu')}
            classNames={{
              root: classes.rootCheckbox,
            }}
            {...form.getInputProps('remember', { type: 'checkbox' })}
          />
          <FilledButton
            type="submit"
            className={cx('body_6-regular', classes.loginBtn)}
          >
            {t('Login.Đăng nhập')}
          </FilledButton>
        </form>
      </Center>
    </Container>
  );
};

export default LoginForm;

const makeStyles = createStyles(() => ({
  container: {
    flex: 1,
    width: '50%',
    position: 'relative',
    padding: 0,
    [media.small()]: {
      order: 2,
      width: '100%',
      minHeight: '100vh',
      padding: '0px 16px',
    },
  },
  content: {
    gap: 12,
    width: '100%',
    height: '100%',
    padding: '100px 0px',
    flexDirection: 'column',
  },
  title: {
    gap: 0,
    justifyContent: 'center',
  },
  align: {
    textAlign: 'center',
  },
  input: {
    height: 42,
    borderRadius: 50,
    backgroundColor: 'var(--white)',
    ':focus': {
      borderColor: 'var(--primary-1)',
    },
    ':focus-within': {
      borderColor: 'var(--primary-1)',
    },
  },
  rootInput: {
    paddingTop: 10,
  },
  iconWrap: {
    width: '100%',
    borderRadius: '50%',
    backgroundColor: 'var(--white)',
  },
  iconInput: {
    left: 2,
    top: 2,
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: 'var(--white)',
  },
  rootCheckbox: {
    padding: '14px 0px',
  },
  loginBtn: {
    height: 42,
    width: '100%',
    borderRadius: '30px !important',
  },
  inputWrapper: {
    height: 42,
  },
  formLogin: {
    width: '45%',
    maxWidth: 345,
    [media.small()]: {
      width: '100%',
    },
  },
  logo: {
    width: 100,
    height: 100,
    margin: '0px auto',
  },
  toogleInput: {
    ':hover': {
      backgroundColor: 'inherit',
    },
  },
}));

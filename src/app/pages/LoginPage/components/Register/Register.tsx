import {
  Avatar,
  Card,
  Center,
  Flex,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { Dispatch, SetStateAction } from 'react';

import { ReactComponent as User } from 'assets/icons/user/user-edit.svg';
import { ReactComponent as Key } from 'assets/icons/security/key-01.svg';
import { ReactComponent as EyeOff } from 'assets/icons/general/eye-off.svg';
import { ReactComponent as EyeOn } from 'assets/icons/general/eye.svg';
import { ReactComponent as Close } from 'assets/icons/general/x.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { registerArray } from 'utils/arrays/registerArray';
import { images } from 'assets/images';
import { authActions } from 'store/slice/auth';

interface Props {
  isShow: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}
const Register = ({ isShow, onClose }: Props) => {
  const dispath = useDispatch();

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const form = useForm({
    initialValues: { username: '', password: '', confirmPassword: '' },
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
      confirmPassword: (value, values) =>
        value !== values.password ? t('Login.Mật khẩu không trùng khớp') : null,
    },
  });
  const handleSubmitRegister = () => {
    dispath(
      authActions.requestRegister({
        username: form.values.username,
        password: form.values.password,
      }),
    );
  };

  if (!isShow) return null;
  return createPortal(
    <Center className={classes.container}>
      <Card className={classes.wrapper}>
        <SubtleButton
          className={classes.closeBtn}
          onClick={() => onClose(false)}
        >
          <Close />
        </SubtleButton>
        <Flex className={classes.group}>
          <Stack className={classes.introduce}>
            <Text className="subtitle_1-bold">Tham gia TechTalk</Text>
            <Text className="small_3-regular">
              {t(
                'Login.Cộng đồng TechTalk giải đáp những thắc mắc của bạn về công nghệ',
              )}
            </Text>
            <Group>
              {registerArray.map((item, index) => (
                <div key={index} className={classes.catagory}>
                  <Text className="body_2-semibold">
                    {t(`Login.${item.tilte}`)}
                  </Text>
                  <Text className="small_3-regular">
                    {t(`Login.${item.content}`)}
                  </Text>
                </div>
              ))}
            </Group>
          </Stack>
          <div className={classes.register}>
            <Stack className={classes.title}>
              <Avatar src={images.logo} className={classes.logo} />
              <Text className={cx('subtitle_2-semibold', classes.align)}>
                {t('Login.Tạo tài khoản')}
              </Text>
              <Text className={cx('small_3-regular', classes.align)}>
                {t(
                  'Login.Tham gia chia sẻ và nhận về thông tin hữu ích về công nghệ ngay bây giờ!',
                )}
              </Text>
            </Stack>
            <form
              className={classes.formLogin}
              onSubmit={form.onSubmit(handleSubmitRegister)}
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
                  innerInput: 'body_5-semibold',
                  input: cx('body_5-semibold', classes.input),
                }}
                {...form.getInputProps('password')}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOff /> : <EyeOn />
                }
              />
              <PasswordInput
                icon={<Key />}
                placeholder={t('Login.Xác nhận mật khẩu')}
                classNames={{
                  icon: classes.iconInput,
                  root: classes.rootInput,
                  input: cx('body_5-semibold', classes.input),
                  innerInput: 'body_5-semibold',
                }}
                {...form.getInputProps('confirmPassword')}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOff /> : <EyeOn />
                }
              />
              <FilledButton
                type="submit"
                className={cx('body_6-regular', classes.loginBtn)}
              >
                {t('Login.Đăng ký')}
              </FilledButton>
            </form>
          </div>
        </Flex>
      </Card>
    </Center>,
    document.body,
  );
};

export default Register;

const makeStyles = createStyles(() => ({
  container: {
    inset: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 100,
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
  loginBtn: {
    height: 42,
    width: '100%',
    marginTop: 20,
    borderRadius: '30px !important',
  },
  inputWrapper: {
    height: 42,
  },
  formLogin: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    margin: '0px auto',
  },
  wrapper: {
    width: 770,
    height: 600,
    padding: '0px !important',
  },
  group: {
    width: '100%',
    height: '100%',
  },
  introduce: {
    gap: 16,
    width: '50%',
    height: '100%',
    color: 'var(--white)',
    padding: '80px 50px',
    backgroundColor: 'var(--primary-3)',
  },
  register: {
    width: '50%',
    padding: '80px 32px 0px',
  },
  catagory: {
    gap: 12,
    height: 'max-content',
    paddingLeft: 8,
    borderLeft: '2px solid var(--white)',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  titleNotification: {},
}));

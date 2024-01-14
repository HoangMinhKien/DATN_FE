/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import Loading from './components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';
import Directional from './components/Directional/Directional';
import PublicRouter from 'routes/PublicRouter';
import PrivateRouter from 'routes/PrivateRouter';
import { ForumPage } from './pages/ForumPage/Loadable';
import Wrapper from './components/Wrapper/Wrapper';
import { PopularPage } from './pages/PopularPage/Loadable';
import { LatestPage } from './pages/LatestPage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import { CategoryPage } from './pages/CategoryaPage/Loadable';
import { CreateTopic } from './pages/CreateTopic/Loadable';
import { TagPage } from './pages/TagPage/Loadable';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { authActions } from 'store/slice/auth';
import { Detail } from './pages/Detail/Loadable';
import { UpdateTopic } from './pages/UpdateTopic/Loadable';

export function App() {
  const dispath = useDispatch();
  const { isLoading, isError, response } = useSelector(selectAuth);

  const { t } = useTranslation();
  React.useEffect(() => {
    if (isError && response.error === -1) {
      notifications.show({
        color: 'red',
        autoClose: 3000,
        title: t('Login.Cảnh báo'),
        message: t('Home.Lỗi xác thực'),
        onClose: () => dispath(authActions.logoutSucces()),
        styles: () => ({
          title: { fontSize: 18, fontWeight: 700, color: 'var(--second-3)' },
          description: { color: 'var(--black)', fontWeight: 600 },
        }),
      });
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  return (
    <>
      <Directional />
      <Loading visible={isLoading} />
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route element={<Wrapper />}>
            <Route element={<ForumPage />}>
              <Route path="/home/news" element={<LatestPage />} />
              <Route path="/home/popular" element={<PopularPage />} />
              <Route
                path="/home/category/:categoryName/:categoryId"
                element={<CategoryPage />}
              />
              <Route path="/home/create" element={<CreateTopic />} />
              <Route path="/home/tag/:tagname" element={<TagPage />} />
            </Route>
            <Route path="/account" element={<ProfilePage />}>
              <Route path="/account/udpate" element={<UpdateTopic />} />
            </Route>
            <Route path="/detail/:topicId" element={<Detail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

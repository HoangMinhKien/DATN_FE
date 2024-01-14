/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ForumPage = lazyLoad(
  () => import('./index'),
  module => module.ForumPage,
);

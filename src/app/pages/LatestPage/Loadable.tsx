/**
 * Asynchronously loads the component for PopularPage
 */

import { lazyLoad } from 'utils/loadable';

export const LatestPage = lazyLoad(
  () => import('./index'),
  module => module.LatestPage,
);

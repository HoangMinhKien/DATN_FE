/**
 * Asynchronously loads the component for PopularPage
 */

import { lazyLoad } from 'utils/loadable';

export const PopularPage = lazyLoad(
  () => import('./index'),
  module => module.PopularPage,
);

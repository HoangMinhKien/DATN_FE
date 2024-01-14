/**
 * Asynchronously loads the component for PopularPage
 */

import { lazyLoad } from 'utils/loadable';

export const TagPage = lazyLoad(
  () => import('./index'),
  module => module.TagPage,
);

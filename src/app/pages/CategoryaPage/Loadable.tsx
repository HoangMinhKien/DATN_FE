/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const CategoryPage = lazyLoad(
  () => import('./index'),
  module => module.CategoryPage,
);

/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateTopic = lazyLoad(
  () => import('./index'),
  module => module.UpdateTopic,
);

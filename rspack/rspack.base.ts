/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { projectRoot } from './utils/paths';
import { isDevelopment } from './utils/env';

export const baseConfig: Configuration = {
  context: projectRoot,
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
  mode: isDevelopment ? 'development' : 'production',
  target: ['browserslist'],
};

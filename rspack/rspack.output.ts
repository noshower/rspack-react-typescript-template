/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { isDevelopment, isProduction } from './utils/env';
import { outputPath, publicPath } from './utils/paths';

const filename = isDevelopment ? '[name]' : '[name].[contenthash:8]';

export const outputConfig: Configuration['output'] = {
  path: isDevelopment ? undefined : outputPath,
  filename: `js/${filename}.js`,
  chunkFilename: `js/${filename}.chunk.js`,
  cssFilename: `css/${filename}.css`,
  cssChunkFilename: `css/${filename}.chunk.css`,
  assetModuleFilename: `asset/${filename}.[ext]`,
  publicPath,
  crossOriginLoading: 'anonymous',
  clean: isProduction,
};

/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import path from 'path';
import { srcDirPath } from './utils/paths';

export const entryConfig: Configuration['entry'] = {
  app: path.resolve(srcDirPath, 'index.tsx'),
};

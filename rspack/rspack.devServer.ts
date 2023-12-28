/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { publicDirPath } from './utils/paths';
import { isDevelopment } from './utils/env';

const devServerConfig: Configuration['devServer'] = isDevelopment
  ? {
      hot: true,
      port: 8091,
      host: '127.0.0.1',
      allowedHosts: ['all'],
      open: true,
      compress: true,
      client: {
        overlay: false,
      },
      static: {
        directory: publicDirPath,
        publicPath: '/',
        watch: true,
      },
      setupExitSignals: true,
    }
  : undefined;

export { devServerConfig };

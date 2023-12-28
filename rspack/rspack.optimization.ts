/* eslint-disable import/no-extraneous-dependencies */
import { Configuration, rspack } from '@rspack/core';
import { isProduction } from './utils/env';

const optimizationConfig: Configuration['optimization'] = {
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial',
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true,
      },
    },
  },
  runtimeChunk: {
    name: 'runtime',
  },
  chunkIds: isProduction ? 'deterministic' : 'named',
};

if (isProduction) {
  optimizationConfig.minimize = true;
  optimizationConfig.minimizer = [new rspack.SwcJsMinimizerRspackPlugin(), new rspack.SwcCssMinimizerRspackPlugin()];
}

export { optimizationConfig };

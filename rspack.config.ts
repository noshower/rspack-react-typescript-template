/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { baseConfig } from './rspack/rspack.base';
import { devServerConfig } from './rspack/rspack.devServer';
import { entryConfig } from './rspack/rspack.entry';
import { experimentsConfig } from './rspack/rspack.experiments';
import { moduleConfig } from './rspack/rspack.module';
import { optimizationConfig } from './rspack/rspack.optimization';
import { outputConfig } from './rspack/rspack.output';
import { pluginsConfig } from './rspack/rspack.plugins';
import { resolveConfig } from './rspack/rspack.resolve';

const config: Configuration = {
  ...baseConfig,
  entry: entryConfig,
  optimization: optimizationConfig,
  output: outputConfig,
  devServer: devServerConfig,
  resolve: resolveConfig,
  plugins: pluginsConfig,
  module: moduleConfig,
  experiments: experimentsConfig,
};
export default config;

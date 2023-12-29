/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { nodeModulesPath, srcDirPath, tsConfigPath } from './utils/paths';

export const resolveConfig: Configuration['resolve'] = {
  // node_modules 不能配置为绝对路径，否则会导致热更新失败
  // modules: [nodeModulesPath],
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  tsConfigPath,
};

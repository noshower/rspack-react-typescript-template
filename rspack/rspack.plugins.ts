/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import rspack from '@rspack/core';
// @ts-ignore
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import PluginReactRefresh from '@rspack/plugin-react-refresh';
import path from 'path';
// @ts-ignore
import HtmlWebpackCrossOriginPlugin from '@darcytech/html-webpack-cross-origin-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { publicDirPath, srcDirPath, tsConfigPath } from './utils/paths';
import { isDevelopment, isProduction } from './utils/env';

const pluginsConfig: Configuration['plugins'] = [
  new AntdDayjsWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'Rspack Template',
    filename: 'index.html',
    template: path.resolve(publicDirPath, 'index.html'),
    scriptLoading: 'defer',
    minify: isProduction
      ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      : undefined,
  }),
  new HtmlWebpackCrossOriginPlugin('anonymous'),
];

if (isDevelopment) {
  pluginsConfig.push(
    new rspack.ProgressPlugin({
      prefix: 'Rspack Template',
    }),
    // @ts-ignore
    new EslintWebpackPlugin({
      cache: true,
      context: srcDirPath,
      eslintPath: require.resolve('eslint'),
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      fix: true,
      emitError: true,
      emitWarning: true,
      lintDirtyModulesOnly: true,
      formatter: 'stylish',
      // rspack 上使用 threads 有问题，会导致编译堵塞
      // threads: true,
    }),
    // @ts-ignore
    new ForkTsCheckerWebpackPlugin({
      async: true,
      formatter: 'codeframe',
      typescript: {
        configFile: tsConfigPath,
        mode: 'write-references',
        typescriptPath: require.resolve('typescript'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      devServer: false,
    }),
    // @ts-ignore
    new StylelintPlugin({
      cache: true,
      context: srcDirPath,
      stylelintPath: require.resolve('stylelint'),
      extensions: ['less', 'css'],
      fix: false,
      emitError: true,
      emitWarning: true,
      lintDirtyModulesOnly: true,
      threads: true,
    }),
    new PluginReactRefresh(),
  );
}

export { pluginsConfig };

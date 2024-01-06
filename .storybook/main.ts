import type { StorybookConfig } from '@storybook/react-webpack5';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import fs from 'fs';
import path from 'path';
import { RuleSetRule } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const swcLoaderOptions = (syntax: 'typescript' | 'ecmascript', isDev: boolean) => {
  return {
    jsc: {
      parser:
        syntax === 'typescript'
          ? {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
              decorators: true,
            }
          : {
              syntax: 'ecmascript',
              jsx: true,
              numericSeparator: true,
              classPrivateProperty: true,
              privateMethod: true,
              classProperty: true,
              functionBind: true,
              decorators: true,
              decoratorsBeforeExport: true,
              exportDefaultFrom: true,
              exportNamespaceFrom: true,
              dynamicImport: true,
              nullishCoalescing: true,
              optionalChaining: true,
              importMeta: true,
              topLevelAwait: true,
              importAssertions: true,
            },
      target: 'es5',
      // false:正常模式尽可能地遵循 ECMAScript 6 的语义 true:松散模式产生更简单的 ES5 代码
      loose: false,
      externalHelpers: true,
      transform: {
        legacyDecorator: true,
        react: {
          runtime: 'automatic',
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          throwIfNamespace: true,
          development: isDev,
          useBuiltins: true,
          refresh: isDev,
        },
      },
    },
  };
};

const projectRootPath = fs.realpathSync(process.cwd());

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  async webpackFinal(config) {
    const isDevelopment = config.mode === 'development';

    let rules = config?.module?.rules as RuleSetRule[];

    // 改写部分 rule
    {
      rules = rules.map((rule) => {
        if (rule.test?.toString() === '/\\.(mjs|cjs|tsx?|jsx?)$/') {
          return {
            test: /\.tsx?$/,
            // include: path.resolve(projectRootPath, 'src'),
            use: [
              {
                loader: require.resolve('swc-loader'),
                options: swcLoaderOptions('typescript', isDevelopment),
              },
            ],
          };
        }
        return rule;
      });

      rules.push({
        test: /\.module.less$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              esModule: true,
              sourceMap: isDevelopment,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              sourceMap: isDevelopment,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      });
    }

    // 覆盖部分配置
    {
      config.resolve!.alias = {
        ...config.resolve!.alias,
        ['styles']: path.resolve(projectRootPath, 'src', 'styles'),
        ['~styles']: path.resolve(projectRootPath, 'src', 'styles'),
      };
      config.resolve!.plugins = [new TsconfigPathsPlugin({ configFile: path.resolve(projectRootPath, 'tsconfig.json') })];
      config.module!.rules = rules;
      config.plugins = [...(config.plugins as any), new ReactRefreshWebpackPlugin()];
    }

    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

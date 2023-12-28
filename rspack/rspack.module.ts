/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';
import { isDevelopment } from './utils/env';
import { srcDirPath } from './utils/paths';

const swcLoaderOptions = (syntax: 'typescript' | 'ecmascript') => {
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
          development: isDevelopment,
          useBuiltins: true,
          refresh: isDevelopment,
        },
      },
    },
  };
};

const moduleConfig: Configuration['module'] = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'builtin:swc-loader',
      include: srcDirPath,
      options: swcLoaderOptions('typescript'),
    },
    {
      test: /\.jsx?$/,
      loader: 'builtin:swc-loader',
      include: srcDirPath,
      options: swcLoaderOptions('ecmascript'),
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024, // 4kb
        },
      },
    },
    {
      test: /\.less$/,
      type: 'css/auto',
      use: [
        ...(isDevelopment
          ? []
          : [
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      require('postcss-flexbugs-fixes'),
                      [
                        require('postcss-preset-env'),
                        {
                          autoprefixer: true,
                          stage: 3,
                        },
                      ],
                    ],
                  },
                  sourceMap: true,
                },
              },
            ]),
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ].filter(Boolean),
    },
  ],
};

export { moduleConfig };

import type { Config } from 'jest';
import tsconfigJson from './tsconfig.json';

const moduleNameMapperFromTSPaths = (tsconfig: typeof tsconfigJson) => {
  const fromPairs = (pairs: Array<[string, string]>) => {
    return pairs.reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
  };

  return fromPairs(
    Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [`^${k.replace(/\*/, '(.*)')}`, `<rootDir>/${v.replace(/\*/, '$1')}`]),
  );
};

const moduleNameMapper = moduleNameMapperFromTSPaths(tsconfigJson);

const config: Config = {
  preset: '@darcytech/jest-preset-darcytech',
  moduleNameMapper,
  transformIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [],
  // collectCoverage: true,
  // collectCoverageFrom: ['**/utils/**/cache.ts', '**/utils/**/stringUtils.ts', '**/utils/**/validator.ts'],
};

export default config;

import path from 'path';

export const projectRoot = path.resolve(__dirname, '../../');

// 入参为相对于项目根目录的路径
const getAbsolutePath = (...paths: string[]) => {
  return path.resolve(projectRoot, ...paths);
};

export const outputPath = getAbsolutePath('dist');

export const srcDirPath = getAbsolutePath('src');

export const nodeModulesPath = getAbsolutePath('node_modules');

export const tsConfigPath = getAbsolutePath('tsconfig.json');

export const publicDirPath = getAbsolutePath('public');

export const publicPath = '/';

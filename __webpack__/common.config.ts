import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import WebpackBar from 'webpackbar';
import CopyPlugin from 'copy-webpack-plugin';

// @ts-ignore
import InterpolateHtmlPlugin from 'interpolate-html-plugin';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { devServer } from './build.devServer';
import { buildLoaders } from './build.loaders';
import { getClientEnvironment, mode } from './env';

import type { Configuration as WebpackConfiguration } from 'webpack';

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const STATIC_DIR = path.resolve(__dirname, '..', 'static');

const env = getClientEnvironment(process.env.PUBLIC_URL ?? '');

const isDev = mode === 'development';

const plugins = [
  isDev &&
    new WebpackBar({
      name: `UxKit`,
      color: '#004fb0',
      profile: true,
    }),
    
  new CopyPlugin({
    patterns: [{ from: STATIC_DIR, to: BUILD_DIR }],
  }),

  new webpack.DefinePlugin(env.stringified),

  new InterpolateHtmlPlugin(env.raw),

  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, 'index.html'),
    filename: 'index.html',
    inject: true,
    minify: true,
  }),

];

if (isDev) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const config: WebpackConfiguration = {
  devServer: isDev ? devServer : undefined,
  plugins,
  entry: path.join(__dirname, '..', 'src', 'index.tsx'),

  output: {
    path: BUILD_DIR,
    /**
     * Helps to avoid of MIME type ('text/html') is not a supported stylesheet
     * And sets address in html imports
     */
    publicPath: '/',
    clean: true,
  },

  // Checking the maximum weight of the bundle is disabled
  performance: {
    hints: false,
  },

  // Modules resolved
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({}),
    ],
    fallback: { url: require.resolve('url/') },
  },

  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: buildLoaders({ isDev: NODE_ENV === 'development' }),
  },
};

export default config;

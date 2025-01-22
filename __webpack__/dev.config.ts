import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfiguration from './common.config';

import type { Configuration as WebpackConfiguration } from 'webpack';

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      mode: 'write-references',
    },
  }),
  new webpack.HotModuleReplacementPlugin(), // For page reloading

  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
];

const developmentConfiguration: WebpackConfiguration = {
  // devServer,
  mode: 'development',
  target: 'web',
  plugins,
  devtool: 'source-map',
  output: {
    filename: '[name].js',
  },
};

const config = merge<WebpackConfiguration>(
  commonConfiguration,
  developmentConfiguration,
);

export default config;

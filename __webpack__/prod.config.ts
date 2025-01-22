import { merge } from 'webpack-merge';
import common from './common.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[contenthash].css',
  }),
];

const config = merge(common, {
  mode: 'production',
  plugins,
  devtool: false,

  output: {
    filename: '[fullhash].js',
  },

  optimization: {
    usedExports: false,
    minimize: true, // Affects Terser Plugin
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          mangle: true,
          compress: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
});

export default config;

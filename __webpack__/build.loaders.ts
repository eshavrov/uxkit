import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from "webpack";

const babelOptions = {};

export const buildLoaders = ({ isDev }: { isDev: boolean }): ModuleOptions['rules'] => {
  // --- JS | TS USING BABEL
  const tsLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true, // Using a cache to avoid of recompilation
        ...babelOptions,
      },
    },
  };

  const fileLoader = {
    test: /\.(png)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  };

  // HTML
  const htmlLoader = {
    test: /\.(html)$/,
    loader: 'html-loader',
    options: {
      sources: true,
    },
  };

  const lessLoader = {
    test: /\.less$/,
    use: [
      { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
    ],
  };

  // S/A/C/SS
  const cssModuleLoader = {
    test: /\.module.(s[ac]|c)ss$/i,
    use: [
      { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader', // translates css into CommonJS
        options: {
          esModule: true,
          // css modules
          modules: {
            localIdentName: isDev
              ? '[path][name]__[local]'
              : '[path][name]__[local]', // format of output
            namedExport: false, // named exports instead of default
          },
        },
      },
      // {
      //   loader: 'postcss-loader',
      //   options: {
      //     postcssOptions: {
      //       plugins: [
      //         postcssPresetEnv(),
      //       ],
      //     },
      //   },
      // },
    ],
  };

  const svgLoader =     {
    test: /\.svg$/i,
    type: 'asset',
    resourceQuery: /url/, // *.svg?url
  };

  const svgReactLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ['@svgr/webpack'],
  };

  const assetsLoader = {
    test: /\.(mp3)$/i,
    exclude: /node_modules/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/media/[hash][ext]',
    },
  };

  return [
    tsLoader,
    fileLoader,
    htmlLoader,
    lessLoader,
    cssModuleLoader,
    svgLoader,
    svgReactLoader,
    assetsLoader,
  ];
};

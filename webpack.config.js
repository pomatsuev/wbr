const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const onDevMode = process.env.NODE_ENV === 'development';
console.log('Development mode:', onDevMode);

function getMiniCSSloaderOptions() {
  return {
    loader: MiniCSSExtractPlugin.loader,
    options: {
      hmr: onDevMode,
      reloadAll: true,
    },
  };
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: onDevMode ? 'source-map' : '',
  entry: {
    bundle: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/static'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash:5].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [getMiniCSSloaderOptions(), 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          getMiniCSSloaderOptions(),
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|ico|gif|ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
        dynamicVendor: {
          name: 'async.vendor',
          chunks: 'async',
        },
      },
    },
  },
  devServer: {
    port: 3000,
    hot: onDevMode,
  },
};

const DEVELOPMENT          = 'development';

const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');

const NODE_ENV = (process.env.NODE_ENV && 
                  process.env.NODE_ENV.trim()) || DEVELOPMENT;

let settings = {
  devtool: false,
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: NODE_ENV === DEVELOPMENT ? 'js/[name]-[hash:5].js' : 'js/[name]-[contenthash:5].js',
  },
  resolve:{
    extensions: [
      '.js', '.jsx', '.css', '.scss', '.sass'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if(NODE_ENV === DEVELOPMENT) {
                  return '[name]-[hash:5].[ext]';
                } else {
                  return '[name]-[contenthash:5].[ext]';
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: NODE_ENV === DEVELOPMENT ? 'css/style-[hash:5].css' : 'css/style-[contenthash:5].css',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',          
        },
        dynamicVendor:{
          name: 'async.vendor',
          chunks: 'async',          
        }
      }
    }
  },
  devServer:{
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
}

module.exports = (_env, argv) => {  
  if(argv.mode === DEVELOPMENT){
    settings.devtool = "source-map";
  }
  console.log('Webpack run with NODE_ENV =', argv.mode === NODE_ENV ? NODE_ENV : argv.mode);
  return settings;
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const dist = 'dist';

module.exports = (env = {}) => {
  //console.log(env);
  return {
    entry: {
      app: './src/index.js',
      temp: './src/temp.js'
    },
    mode: 'development',
    output: {
      filename: '[name]-[chunkhash:8]-main.js',
      path: path.resolve(__dirname, dist)
    },
    module:{
      rules:[
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            require.resolve('postcss-loader'),
          ],
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([dist]),
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        appMountId: 'app',
        mobile: true,
        htmlIE: false,
        minify: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          preserveLineBreaks: true
        }
      })
    ]
  };
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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

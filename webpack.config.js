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
    module:{
      rules:[
        {
          test:/\.css$/,
          use:[
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([dist]),
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
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

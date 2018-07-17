const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./config_webpack/paths');

module.exports = (env = {}) => {
  //console.log(env);
  //console.table(paths);
  return {
    devtool: 'cheap-module-source-map',
    entry: [
      paths.appMainJS
    ],
    mode: 'development',
    output: {
      pathinfo: true,
      path: paths.appDist,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin([paths.appDist]),
      new HtmlWebpackPlugin({
        inject: false,
        template: paths.appTemplate,
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

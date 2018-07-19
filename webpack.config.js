const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
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
    resolve:{
      modules:['node_modules'],
      extensions: ['.js', '.json', '.jsx'],
      plugins: [
        //When using    require("component/foo")
        //will look for 'some/directory/foo/index.js
        //followed by   'some/directory/foo/foo.js
        new DirectoryNamedWebpackPlugin(true)
      ],
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

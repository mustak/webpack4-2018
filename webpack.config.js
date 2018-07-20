const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const paths = require('./config_webpack/paths');


//const autoprefixer = require('autoprefixer');
//const postcssPresetEnv = require('postcss-preset-env');

module.exports = (env = {}) => {
  const nodeEnv = env.production ? 'production' : 'development';
  process.env.BABEL_ENV = nodeEnv;
  process.env.NODE_ENV = nodeEnv;

  return {
    devtool: 'cheap-module-source-map',
    entry: [
      paths.appMainJS
    ],
    mode: nodeEnv,
    output: {
      pathinfo: true,
      path: paths.appDist,
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: ''
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.json', '.jsx', '.mjs'],
      plugins: [
        //When using    require("component/foo")
        //will look for 'some/directory/foo/index.js
        //followed by   'some/directory/foo/foo.js
        new DirectoryNamedWebpackPlugin(true)
      ],
    },
    module: {
      rules: [{
          enforce: 'pre',
          test: /\.(js|jsx|mjs)$/,
          use: [{
            loader: require.resolve('eslint-loader'),
            options: {
              formatter: require("eslint/lib/formatters/stylish"),
              eslintPath: require.resolve('eslint'),
            },
          }, ],
          include: paths.appSrc,
        }, //eslint enforce:pre
        {
          oneOf: [
            // Process with babel-loader.
            {
              test: /\.(js|jsx|mjs)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
              },
            },
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
      ] //end rule
    }, //end module

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
const path = require('path');
const webpack = require('webpack');
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
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || '0.0.0.0';

  return {
    devtool: 'cheap-module-source-map',
    entry: [
      paths.appMainJS
    ],
    mode: nodeEnv,
    output: {
      pathinfo: true,
      path: paths.appDist,
      filename: 'assets/js/bundle.js',
      chunkFilename: 'assets/js/[name].chunk.js',
      publicPath: paths.publicPath,
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
        }, //end eslint enforce:pre rule
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
            },
            {
              test: [/\.(bmp|gif|jpeg|png|svg)$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 12000,
                name: 'assets/imgs/[name].[hash:8].[ext]',
              },
            },
            {
              exclude: [/\.(js|jsx|mjs|ejs)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
          ], //end oneOf array
        }, //end oneOF rule
      ] //end rules
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
      }), //end HtmlWebpackPlugin
      new webpack.HotModuleReplacementPlugin(),
    ], //end plugins
    devServer: {      
      https: protocol === 'https',
      host: host,
      compress: true,
      hot: true,
      contentBase: 'dist/assets',
      watchContentBase: true,
      publicPath: paths.publicPath,
      quiet: true,
    }, //end devServer
    performance: {
      hints: false
    },
  }; //end return object
}
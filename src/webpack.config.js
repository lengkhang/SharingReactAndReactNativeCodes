/* eslint-disable no-var */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  var config = {
    entry: {
      app: ['./src/index.js']
    },

    output: {
      filename: 'bundle.js',
      publicPath: '/',
      path: options.outputPath
    },

    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.ProgressPlugin(function (percentage, message) {
        var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
        var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
        process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '%: ' + message + MOVE_LEFT);
      }),
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
      })
    ],

    devtool: options.dev ? 'cheap-module-eval-source-map' : 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              plugins: [
                'transform-decorators-legacy',
                'transform-object-rest-spread',
                'syntax-async-functions',
                'transform-async-to-generator',
                'transform-class-properties'
              ],
              presets: [
                ['es2015', { modules: false }],
                'react'
              ],
              env: {
                development: {
                  plugins: [['react-transform', {
                    transforms: [{
                      transform: 'react-transform-hmr',
                      // if you use React Native, pass 'react-native' instead:
                      imports: ['react'],
                      // this is important for Webpack HMR:
                      locals: ['module']
                    }]
                  }]]
                }
              }
            }
          }
        },
        { test: /\.png$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/png' },
        { test: /\.jpg$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/jpeg' },
        { test: /\.svg$/, loader: 'url-loader?limit=' + String(1024 * 1024) + '&mimetype=image/svg+xml!svgo-loader' },
        { test: /\.eot/, loader: 'url-loader', options: { limit: 10000 } },
        {
          test: /\.scss$/,
          exclude: /third-party.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader!sass-loader'
          })
        },
        {
          test: /third-party.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?-autoprefixer&importLoaders=1!sass-loader'
          })
        }
      ]
    },

    resolve: {
      unsafeCache: options.dev,
      modules: ['node_modules', 'theme'],
      extensions: ['.web.js', '.js']
    }
  };

  if (options.dev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    config.entry.app.push('webpack-hot-middleware/client');
  } else {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      output: {
        comments: false
      }
    }));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  }

  return config;
};
/* eslint-enable no-var */
const [
  path,
  HtmlWebpackPlugin,
  MiniCssExtractPlugin,
  ESLintPlugin
] = [
  require('path'),
  require('html-webpack-plugin'),
  require('mini-css-extract-plugin'),
  require('eslint-webpack-plugin')
]

const env = require('./.env')

const config = {
  context: pathTo('src'),
  mode: env.mode,
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './index.js']
  },
  output: {
    clean: true,
    path: pathTo('dist'),
    filename: `${filename('[name]', 'js')}`
  },
  resolve: {
    alias: {
      '@src': pathTo('src'),
      '@core': pathTo('src/core')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: `${filename('[name]', 'css')}`
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}

if (env.dev) {
  config.devtool = 'source-map'
  config.devServer = {
    port: 8080,
    hot: true,
    watchFiles: './',
    client: {
      overlay: false
    }
  }
}

module.exports = config

function pathTo(...args) {
  return path.resolve(__dirname, ...args)
}

function filename(name, ext) {
  return env.prod
    ? `${name}.[fullhash].min.${ext}`
    : `${name}.[contenthash].dev.${ext}`
}

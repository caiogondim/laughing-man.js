const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: {
    video: './example/video.js',
  },
  output: {
    path: `${__dirname}/example/`,
    filename: '[name].js'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: Infinity
            }
          }
        ]
      }
    ]
  }
}

module.exports = webpackConfig

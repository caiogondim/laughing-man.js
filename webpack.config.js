const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: './example/index.js',
  output: {
    path: `${__dirname}/example/`,
    filename: 'bundle.js'
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
